"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types = require("./types");
function isNodeExported(node) {
    return (node.flags & ts.NodeFlags.ExportContext) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile) || false;
}
exports.isNodeExported = isNodeExported;
function onlyExported(node, opts) {
    return opts.onlyExported ? isNodeExported(node) : true;
}
function typeOfSymbol(symbol, opts) {
    return typeOfInfo(opts.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration), opts);
}
exports.typeOfSymbol = typeOfSymbol;
function typeOfInfo(type, opts) {
    return {
        text: opts.checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType),
        tsType: type
    };
}
exports.typeOfInfo = typeOfInfo;
function symbolInfo(symbol, opts) {
    return {
        type: symbol ? typeOfSymbol(symbol, opts) : undefined,
        doc: symbol ? ts.displayPartsToString(symbol.getDocumentationComment()) : '',
        name: symbol ? symbol.getName() : '',
    };
}
exports.symbolInfo = symbolInfo;
function parseSymbol(node, opts, symbol) {
    var isIdentifier = ts.isIdentifier(node);
    var identifier = isIdentifier ? node : undefined;
    if (identifier)
        node = identifier.parent;
    if (!symbol)
        if (identifier)
            symbol = opts.checker.getSymbolAtLocation(identifier);
        else
            symbol = opts.checker.getSymbolAtLocation(node);
    return __assign({ symbol: symbol,
        identifier: identifier, modifiers: node.modifiers ? parseModifiers(node.modifiers, opts) : undefined, node: node, exported: isNodeExported(node) ? true : undefined }, symbolInfo(symbol, opts));
}
exports.parseSymbol = parseSymbol;
function parseVariable(node, opts) {
    return __assign({}, parseSymbol(node.name || node, opts));
}
exports.parseVariable = parseVariable;
function parseParameter(node, opts) {
    return __assign({}, parseSymbol(node.name || node, opts));
}
exports.parseParameter = parseParameter;
function parseSignature(signature, opts) {
    return {
        parameters: signature.parameters.map(function (symb) { return symbolInfo(symb, opts); }),
        returnType: typeOfInfo(signature.getReturnType(), opts),
        doc: ts.displayPartsToString(signature.getDocumentationComment())
    };
}
exports.parseSignature = parseSignature;
function parseFunc(node, opts) {
    var symb = parseSymbol(node.name || node, opts);
    var returnType = undefined;
    if (symb.type) {
        var callSignatures = symb.type.tsType.getCallSignatures();
        if (callSignatures.length > 0) {
            var callSignature = callSignatures[0];
            var parsedSignature = parseSignature(callSignature, opts);
            returnType = parsedSignature.returnType;
        }
    }
    return __assign({}, symb, { args: node.parameters.map(function (param) { return parseParameter(param, opts); }), returnType: returnType, bodyNode: node.body });
}
exports.parseFunc = parseFunc;
function parseTypeAlias(node, opts) {
    return __assign({}, parseSymbol(node.name || node, opts));
}
exports.parseTypeAlias = parseTypeAlias;
function parseClass(node, opts) {
    var methods = [];
    var members = [];
    ts.forEachChild(node, function (node) {
        if (ts.isMethodDeclaration(node))
            methods.push(parseClassMethod(node, opts));
        else if (ts.isClassElement(node))
            members.push(parseClassMember(node, opts));
    });
    return __assign({}, parseSymbol(node.name || node, opts), { methods: methods,
        members: members, decorators: [] });
}
exports.parseClass = parseClass;
function parseClassMethod(node, opts) {
    var func = parseFunc(node, opts);
    return __assign({}, func, parseSymbol(node.name || node, opts), { modifiers: [] });
}
exports.parseClassMethod = parseClassMethod;
function parseClassMember(node, opts) {
    return __assign({}, parseSymbol(node.name || node, opts), { modifiers: [] });
}
exports.parseClassMember = parseClassMember;
function parseModuleBody(parentNode, opts) {
    var r = {
        functions: [],
        variables: [],
        classes: [],
        types: []
    };
    ts.forEachChild(parentNode, function (node) {
        if (ts.isFunctionDeclaration(node) && onlyExported(node, opts))
            r.functions.push(parseFunc(node, opts));
        else if (ts.isVariableDeclaration(node) && onlyExported(node, opts))
            r.variables.push(parseVariable(node, opts));
        else if (ts.isClassDeclaration(node) && onlyExported(node, opts))
            r.classes.push(parseClass(node, opts));
        else if (ts.isTypeAliasDeclaration(node) && onlyExported(node, opts))
            r.types.push(parseTypeAlias(node, opts));
    });
    return r;
}
exports.parseModuleBody = parseModuleBody;
function parseModule(node, opts) {
    return __assign({}, parseSymbol(node, opts), parseModuleBody(node, opts));
}
exports.parseModule = parseModule;
function parseSourceFile(node, opts) {
    var modules = [];
    ts.forEachChild(node, function (node) {
        if (ts.isModuleDeclaration(node) && onlyExported(node, opts))
            modules.push(parseModule(node, opts));
    });
    return __assign({}, parseModuleBody(node, opts), { fileName: node.fileName, modules: modules, sourceFile: node });
}
exports.parseSourceFile = parseSourceFile;
function parseModifiers(modifiers, opts) {
    return modifiers.map(function (modifier) { return types.modifierFromSyntax(modifier); });
}
exports.parseModifiers = parseModifiers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUM7QUFDakMsK0JBQWlDO0FBT2pDLHdCQUErQixJQUFhO0lBQ3hDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3RJLENBQUM7QUFGRCx3Q0FFQztBQUVELHNCQUFzQixJQUFhLEVBQUUsSUFBa0I7SUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNELENBQUM7QUFFRCxzQkFBNkIsTUFBaUIsRUFBRSxJQUFrQjtJQUM5RCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxnQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RHLENBQUM7QUFGRCxvQ0FFQztBQUVELG9CQUEyQixJQUFhLEVBQUUsSUFBa0I7SUFDeEQsTUFBTSxDQUFDO1FBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztRQUM1SCxNQUFNLEVBQUUsSUFBSTtLQUNmLENBQUE7QUFDTCxDQUFDO0FBTEQsZ0NBS0M7QUFFRCxvQkFBMkIsTUFBMkIsRUFB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