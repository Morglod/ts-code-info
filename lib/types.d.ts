import * as ts from 'typescript';
export declare const ModifiersSyntaxMap: {
    abstract: ts.SyntaxKind;
    async: ts.SyntaxKind;
    const: ts.SyntaxKind;
    declare: ts.SyntaxKind;
    default: ts.SyntaxKind;
    export: ts.SyntaxKind;
    public: ts.SyntaxKind;
    private: ts.SyntaxKind;
    protected: ts.SyntaxKind;
    readonly: ts.SyntaxKind;
    static: ts.SyntaxKind;
};
export declare function modifierFromSyntax(modifier: ts.Modifier): Modifier;
export declare type Modifier = keyof typeof ModifiersSyntaxMap;
export declare const Modifiers: Modifier[];
export declare const ClassMethodModifiers: Modifier[];
export declare type ClassMethodModifiersType = typeof ClassMethodModifiers[0];
export declare const ClassMemberModifiers: Modifier[];
export declare type ClassMemberModifiersType = typeof ClassMemberModifiers[0];
export declare type TypeOf = {
    text: string;
    tsType: ts.Type;
};
export declare type DeclInfo<DeclT extends ts.Node = ts.Node, ModifiersT extends Modifier = Modifier> = {
    symbol?: ts.Symbol;
    identifier?: ts.Identifier;
    modifiers?: ModifiersT[];
    node: DeclT;
    doc: string;
    name: string;
    exported?: boolean;
    type?: TypeOf;
};
export declare type Parameter = DeclInfo<ts.ParameterDeclaration> & {};
export declare type FuncInfo_ = {
    args: Parameter[];
    returnType?: TypeOf;
    bodyNode: ts.FunctionBody;
};
export declare type Func = DeclInfo<ts.FunctionDeclaration> & FuncInfo_;
export declare type TypeAlias = DeclInfo<ts.TypeAliasDeclaration> & {};
export declare type Variable = DeclInfo<ts.VariableDeclaration> & {};
export declare type ClassMethod = DeclInfo<ts.MethodDeclaration, ClassMethodModifiersType> & FuncInfo_ & {};
export declare type ClassMember = DeclInfo<ts.ClassElement, ClassMemberModifiersType> & {};
export declare type Class = DeclInfo<ts.ClassDeclaration> & {
    members: ClassMember[];
    methods: ClassMethod[];
    decorators: Decorator[];
};
export declare type Decorator = DeclInfo<ts.Decorator> & {};
export declare type ModuleBody = {
    classes: Class[];
    variables: Variable[];
    functions: Func[];
    types: TypeAlias[];
};
export declare type Module = DeclInfo<ts.ModuleDeclaration> & ModuleBody;
export declare type FileInfo = ModuleBody & {
    sourceFile: ts.SourceFile;
    fileName: string;
    modules: Module[];
};
