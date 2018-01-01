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
    return opts.checker.typeToString(type);
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
    // const type = symb.symbol ? opts.checker.getTypeOfSymbolAtLocation(symb.symbol, node);
    // const callSignatures = type.getCallSignatures().map(sign => parseSignature(sign, opts));
    return __assign({}, symb, { args: node.parameters.map(function (param) { return parseParameter(param, opts); }), returnType: '', bodyNode: node.body });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUM7QUFDakMsK0JBQWlDO0FBT2pDLHdCQUErQixJQUFhO0lBQ3hDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3RJLENBQUM7QUFGRCx3Q0FFQztBQUVELHNCQUFzQixJQUFhLEVBQUUsSUFBa0I7SUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNELENBQUM7QUFFRCxzQkFBNkIsTUFBaUIsRUFBRSxJQUFrQjtJQUM5RCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxnQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RHLENBQUM7QUFGRCxvQ0FFQztBQUVELG9CQUEyQixJQUFhLEVBQUUsSUFBa0I7SUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFGRCxnQ0FFQztBQUVELG9CQUEyQixNQUEyQixFQUFFLElBQWtCO0lBQ3RFLE1BQU0sQ0FBQztRQUNILElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFD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