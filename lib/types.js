"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
exports.ModifiersSyntaxMap = {
    abstract: ts.SyntaxKind.AbstractKeyword,
    async: ts.SyntaxKind.AsyncKeyword,
    const: ts.SyntaxKind.ConstKeyword,
    declare: ts.SyntaxKind.DeclareKeyword,
    default: ts.SyntaxKind.DefaultKeyword,
    export: ts.SyntaxKind.ExportKeyword,
    public: ts.SyntaxKind.PublicKeyword,
    private: ts.SyntaxKind.PrivateKeyword,
    protected: ts.SyntaxKind.ProtectedKeyword,
    readonly: ts.SyntaxKind.ReadonlyKeyword,
    static: ts.SyntaxKind.StaticKeyword
};
function modifierFromSyntax(modifier) {
    return Object.entries(exports.ModifiersSyntaxMap).find(function (_a) {
        var _b = __read(_a, 2), key = _b[0], syntax = _b[1];
        return syntax === modifier.kind;
    })[0];
}
exports.modifierFromSyntax = modifierFromSyntax;
exports.Modifiers = Object.keys(exports.ModifiersSyntaxMap);
exports.ClassMethodModifiers = [
    'async',
    'public',
    'private',
    'protected',
    'readonly',
    'static'
];
exports.ClassMemberModifiers = [
    'public',
    'private',
    'protected',
    'readonly',
    'static'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWlDO0FBRXBCLFFBQUEsa0JBQWtCLEdBQUc7SUFDOUIsUUFBUSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZTtJQUN2QyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZO0lBQ2pDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVk7SUFDakMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYztJQUNyQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjO0lBQ3JDLE1BQU0sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWE7SUFDbkMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYTtJQUNuQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjO0lBQ3JDLFNBQVMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtJQUN6QyxRQUFRLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlO0lBQ3ZDLE1BQU0sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWE7Q0FDdEMsQ0FBQTtBQUVELDRCQUFtQyxRQUFxQjtJQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQWU7WUFBZixrQkFBZSxFQUFiLFdBQUcsRUFBRSxjQUFNO1FBQU8sT0FBQSxNQUFNLEtBQUssUUFBUSxDQUFDLElBQUk7SUFBeEIsQ0FBd0IsQ0FBRSxDQUFDLENBQUMsQ0FBYSxDQUFDO0FBQ2xILENBQUM7QUFGRCxnREFFQztBQUdZLFFBQUEsU0FBUyxHQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQWtCLENBQWUsQ0FBQTtBQUVyRSxRQUFBLG9CQUFvQixHQUFlO0lBQzVDLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsUUFBUTtDQUNYLENBQUM7QUFHVyxRQUFBLG9CQUFvQixHQUFlO0lBQzVDLFFBQVE7SUFDUixTQUFTO0lBQ1QsV0FBVztJQUNYLFVBQVU7SUFDVixRQUFRO0NBQ1gsQ0FBQyJ9