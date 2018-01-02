import * as ts from 'typescript';

export const ModifiersSyntaxMap = {
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
}

export function modifierFromSyntax(modifier: ts.Modifier): Modifier {
    return Object.entries(ModifiersSyntaxMap).find(([ key, syntax ]) => syntax === modifier.kind)![0] as Modifier;
}

export type Modifier = keyof typeof ModifiersSyntaxMap;
export const Modifiers: Modifier[] = Object.keys(ModifiersSyntaxMap) as Modifier[]

export const ClassMethodModifiers: Modifier[] = [
    'async',
    'public',
    'private',
    'protected',
    'readonly',
    'static'
];
export type ClassMethodModifiersType = typeof ClassMethodModifiers[0];

export const ClassMemberModifiers: Modifier[] = [
    'public',
    'private',
    'protected',
    'readonly',
    'static'
];
export type ClassMemberModifiersType = typeof ClassMemberModifiers[0];

export type TypeOf = {
    text: string,
    tsType: ts.Type
}

export type DeclInfo<DeclT extends ts.Node = ts.Node, ModifiersT extends Modifier = Modifier> = {
    symbol?: ts.Symbol,
    identifier?: ts.Identifier,
    modifiers?: ModifiersT[],
    node: DeclT,
    doc: string,
    name: string,
    exported?: boolean,
    type?: TypeOf
}

export type Parameter = DeclInfo<ts.ParameterDeclaration> & {  }

export type FuncInfo_ = {
    args: Parameter[],
    returnType?: TypeOf,
    bodyNode: ts.FunctionBody,
};

export type Func = DeclInfo<ts.FunctionDeclaration> & FuncInfo_;

export type TypeAlias = DeclInfo<ts.TypeAliasDeclaration> & {  }

export type Variable = DeclInfo<ts.VariableDeclaration> & {  }

export type ClassMethod = DeclInfo<ts.MethodDeclaration, ClassMethodModifiersType> & FuncInfo_ & {
}

export type ClassMember = DeclInfo<ts.ClassElement, ClassMemberModifiersType> & {
}

export type Class = DeclInfo<ts.ClassDeclaration> & {
    members: ClassMember[],
    methods: ClassMethod[],
    decorators: Decorator[]
}

export type Decorator = DeclInfo<ts.Decorator> & {  }

export type ModuleBody = {
    classes: Class[],
    variables: Variable[],
    functions: Func[],
    types: TypeAlias[],
}

export type Module = DeclInfo<ts.ModuleDeclaration> & ModuleBody

export type FileInfo = ModuleBody & {
    sourceFile: ts.SourceFile,
    fileName: string,
    modules: Module[]
}