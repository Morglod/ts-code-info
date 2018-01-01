import * as ts from 'typescript';
import * as types from './types';
export declare type ParseOptions = {
    checker: ts.TypeChecker;
    onlyExported?: boolean;
};
export declare function isNodeExported(node: ts.Node): boolean;
export declare function typeOfSymbol(symbol: ts.Symbol, opts: ParseOptions): types.TypeOf;
export declare function typeOfInfo(type: ts.Type, opts: ParseOptions): types.TypeOf;
export declare function symbolInfo(symbol: ts.Symbol | undefined, opts: ParseOptions): {
    type: string | undefined;
    doc: string;
    name: string;
};
export declare function parseSymbol<NodeDeclT extends ts.Node = ts.Node>(node: ts.Node, opts: ParseOptions, symbol?: ts.Symbol): types.DeclInfo<NodeDeclT>;
export declare function parseVariable(node: ts.VariableDeclaration, opts: ParseOptions): types.Variable;
export declare function parseParameter(node: ts.ParameterDeclaration, opts: ParseOptions): types.Parameter;
export declare function parseSignature(signature: ts.Signature, opts: ParseOptions): {
    parameters: {
        type: string | undefined;
        doc: string;
        name: string;
    }[];
    returnType: string;
    doc: string;
};
export declare function parseFunc(node: ts.FunctionDeclaration, opts: ParseOptions): types.Func;
export declare function parseTypeAlias(node: ts.TypeAliasDeclaration, opts: ParseOptions): types.TypeAlias;
export declare function parseClass(node: ts.ClassDeclaration, opts: ParseOptions): types.Class;
export declare function parseClassMethod(node: ts.MethodDeclaration, opts: ParseOptions): types.ClassMethod;
export declare function parseClassMember(node: ts.ClassElement, opts: ParseOptions): types.ClassMember;
export declare function parseModuleBody(parentNode: ts.Node, opts: ParseOptions): types.ModuleBody;
export declare function parseModule(node: ts.ModuleDeclaration, opts: ParseOptions): types.Module;
export declare function parseSourceFile(node: ts.SourceFile, opts: ParseOptions): types.FileInfo;
export declare function parseModifiers(modifiers: ts.ModifiersArray, opts: ParseOptions): types.Modifier[];
