import * as ts from 'typescript';
import * as types from './types';

export type ParseOptions = {
    checker: ts.TypeChecker,
    onlyExported?: boolean
}

export function isNodeExported(node: ts.Node): boolean {
    return (node.flags & ts.NodeFlags.ExportContext) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile) || false;
}

function onlyExported(node: ts.Node, opts: ParseOptions): boolean {
    return opts.onlyExported ? isNodeExported(node) : true;
}

export function typeOfSymbol(symbol: ts.Symbol, opts: ParseOptions): types.TypeOf {
    return typeOfInfo(opts.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!), opts);
}

export function typeOfInfo(type: ts.Type, opts: ParseOptions): types.TypeOf {
    return {
        text: opts.checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType),
        tsType: type
    }
}

export function symbolInfo(symbol: ts.Symbol|undefined, opts: ParseOptions) {
    return {
        type: symbol ? typeOfSymbol(symbol, opts) : undefined,
        doc: symbol ? ts.displayPartsToString(symbol.getDocumentationComment()) : '',
        name: symbol ? symbol.getName() : '',
    };
}

export function parseSymbol<NodeDeclT extends ts.Node = ts.Node>(node: ts.Node, opts: ParseOptions, symbol?: ts.Symbol): types.DeclInfo<NodeDeclT> {
    const isIdentifier = ts.isIdentifier(node);
    const identifier = isIdentifier ? node as ts.Identifier : undefined;

    if (identifier) node = identifier.parent!;

    if (!symbol)
        if (identifier) symbol = opts.checker.getSymbolAtLocation(identifier);
        else symbol = opts.checker.getSymbolAtLocation(node);

    return {
        symbol,
        identifier,
        modifiers: node.modifiers ? parseModifiers(node.modifiers, opts) : undefined,
        node: node as NodeDeclT,
        exported: isNodeExported(node) ? true : undefined,
        ...symbolInfo(symbol, opts)
    };
}

export function parseVariable(node: ts.VariableDeclaration, opts: ParseOptions): types.Variable {
    return {
        ...parseSymbol(node.name || node, opts),
    };
}

export function parseParameter(node: ts.ParameterDeclaration, opts: ParseOptions): types.Parameter {
    return {
        ...parseSymbol(node.name || node, opts),
    };
}

export function parseSignature(signature: ts.Signature, opts: ParseOptions) {
    return {
        parameters: signature.parameters.map(symb => symbolInfo(symb, opts)),
        returnType: typeOfInfo(signature.getReturnType(), opts),
        doc: ts.displayPartsToString(signature.getDocumentationComment())
    };
}

export function parseFunc(node: ts.FunctionDeclaration, opts: ParseOptions): types.Func {
    const symb = parseSymbol<ts.FunctionDeclaration>(node.name || node, opts);
    let returnType: types.TypeOf|undefined = undefined;

    if (symb.type) {
        const callSignatures = symb.type.tsType.getCallSignatures();
        if (callSignatures.length > 0) {
            const callSignature = callSignatures[0];
            const parsedSignature = parseSignature(callSignature, opts);
            returnType = parsedSignature.returnType;
        }
    }

    return {
        ...symb,
        args: node.parameters.map(param => parseParameter(param, opts)),
        returnType,
        bodyNode: node.body!
    };
}

export function parseTypeAlias(node: ts.TypeAliasDeclaration, opts: ParseOptions): types.TypeAlias {
    return {
        ...parseSymbol(node.name || node, opts)
    };
}

export function parseClass(node: ts.ClassDeclaration, opts: ParseOptions): types.Class {
    const methods: types.ClassMethod[] = [];
    const members: types.ClassMember[] = [];

    ts.forEachChild(node, node => {
        if (ts.isMethodDeclaration(node))
            methods.push(parseClassMethod(node, opts));
        else if (ts.isClassElement(node))
            members.push(parseClassMember(node, opts));
    });

    return {
        ...parseSymbol(node.name || node, opts),
        methods,
        members,
        decorators: []
    }
}

export function parseClassMethod(node: ts.MethodDeclaration, opts: ParseOptions): types.ClassMethod {
    const func = parseFunc(node as any as ts.FunctionDeclaration, opts);

    return {
        ...func,
        ...parseSymbol(node.name || node, opts),
        modifiers: []
    };
}

export function parseClassMember(node: ts.ClassElement, opts: ParseOptions): types.ClassMember {
    return {
        ...parseSymbol(node.name || node, opts),
        modifiers: []
    };
}

export function parseModuleBody(parentNode: ts.Node, opts: ParseOptions): types.ModuleBody {
    const r: types.ModuleBody = {
        functions: [],
        variables: [],
        classes: [],
        types: []
    };

    ts.forEachChild(parentNode, node => {
        if (ts.isFunctionDeclaration(node) && onlyExported(node, opts))
            r.functions.push(parseFunc(node as ts.FunctionDeclaration, opts))
        else if (ts.isVariableDeclaration(node) && onlyExported(node, opts))
            r.variables.push(parseVariable(node as ts.VariableDeclaration, opts))
        else if (ts.isClassDeclaration(node) && onlyExported(node, opts))
            r.classes.push(parseClass(node as ts.ClassDeclaration, opts))
        else if (ts.isTypeAliasDeclaration(node) && onlyExported(node, opts))
            r.types.push(parseTypeAlias(node as ts.TypeAliasDeclaration, opts))
    });

    return r;
}

export function parseModule(node: ts.ModuleDeclaration, opts: ParseOptions): types.Module {
    return {
        ...parseSymbol(node, opts),
        ...parseModuleBody(node, opts)
    };
}

export function parseSourceFile(node: ts.SourceFile, opts: ParseOptions): types.FileInfo {
    const modules: types.Module[] = [];

    ts.forEachChild(node, node => {
        if (ts.isModuleDeclaration(node) && onlyExported(node, opts))
            modules.push(parseModule(node as ts.ModuleDeclaration, opts));
    })

    return {
        ...parseModuleBody(node, opts),
        fileName: node.fileName,
        modules,
        sourceFile: node
    };
}

export function parseModifiers(modifiers: ts.ModifiersArray, opts: ParseOptions): types.Modifier[] {
    return modifiers.map(modifier => types.modifierFromSyntax(modifier));
}