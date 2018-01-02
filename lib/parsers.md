
# Variables




# Functions

## `isNodeExported`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.Node) => boolean  
```  
  
in source:  
```ts  

export declare function isNodeExported(node: ts.Node): boolean;  
```  
  
Args  
  
* `node` - ts.Node  
  
Returns  
```ts  
boolean  
```  
## `typeOfSymbol`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(symbol: ts.Symbol, opts: ParseOptions) => TypeOf  
```  
  
in source:  
```ts  

export declare function typeOfSymbol(symbol: ts.Symbol, opts: ParseOptions): types.TypeOf;  
```  
  
Args  
  
* `symbol` - ts.Symbol  
* `opts` - ParseOptions  
  
Returns  
```ts  
TypeOf  
```  
## `typeOfInfo`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(type: ts.Type, opts: ParseOptions) => TypeOf  
```  
  
in source:  
```ts  

export declare function typeOfInfo(type: ts.Type, opts: ParseOptions): types.TypeOf;  
```  
  
Args  
  
* `type` - ts.Type  
* `opts` - ParseOptions  
  
Returns  
```ts  
TypeOf  
```  
## `symbolInfo`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(symbol: ts.Symbol, opts: ParseOptions) => { type: TypeOf; doc: string; name: string; }  
```  
  
in source:  
```ts  

export declare function symbolInfo(symbol: ts.Symbol | undefined, opts: ParseOptions): {
    type: types.TypeOf | undefined;
    doc: string;
    name: string;
};  
```  
  
Args  
  
* `symbol` - ts.Symbol  
* `opts` - ParseOptions  
  
Returns  
```ts  
{ type: TypeOf; doc: string; name: string; }  
```  
## `parseSymbol`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
<NodeDeclT extends ts.Node = ts.Node>(node: ts.Node, opts: ParseOptions, symbol?: ts.Symbol) => DeclInfo<NodeDeclT, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
  
in source:  
```ts  

export declare function parseSymbol<NodeDeclT extends ts.Node = ts.Node>(node: ts.Node, opts: ParseOptions, symbol?: ts.Symbol): types.DeclInfo<NodeDeclT>;  
```  
  
Args  
  
* `node` - ts.Node  
* `opts` - ParseOptions  
* `symbol` - ts.Symbol  
  
Returns  
```ts  
DeclInfo<NodeDeclT, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
## `parseVariable`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.VariableDeclaration, opts: ParseOptions) => DeclInfo<ts.VariableDeclaration, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
  
in source:  
```ts  

export declare function parseVariable(node: ts.VariableDeclaration, opts: ParseOptions): types.Variable;  
```  
  
Args  
  
* `node` - ts.VariableDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
DeclInfo<ts.VariableDeclaration, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
## `parseParameter`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.ParameterDeclaration, opts: ParseOptions) => DeclInfo<ts.ParameterDeclaration, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
  
in source:  
```ts  

export declare function parseParameter(node: ts.ParameterDeclaration, opts: ParseOptions): types.Parameter;  
```  
  
Args  
  
* `node` - ts.ParameterDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
DeclInfo<ts.ParameterDeclaration, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
## `parseSignature`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(signature: ts.Signature, opts: ParseOptions) => { parameters: { type: TypeOf; doc: string; name: string; }[]; returnType: TypeOf; doc: string; }  
```  
  
in source:  
```ts  

export declare function parseSignature(signature: ts.Signature, opts: ParseOptions): {
    parameters: {
        type: types.TypeOf | undefined;
        doc: string;
        name: string;
    }[];
    returnType: types.TypeOf;
    doc: string;
};  
```  
  
Args  
  
* `signature` - ts.Signature  
* `opts` - ParseOptions  
  
Returns  
```ts  
{ parameters: { type: TypeOf; doc: string; name: string; }[]; returnType: TypeOf; doc: string; }  
```  
## `parseFunc`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.FunctionDeclaration, opts: ParseOptions) => Func  
```  
  
in source:  
```ts  

export declare function parseFunc(node: ts.FunctionDeclaration, opts: ParseOptions): types.Func;  
```  
  
Args  
  
* `node` - ts.FunctionDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
Func  
```  
## `parseTypeAlias`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.TypeAliasDeclaration, opts: ParseOptions) => DeclInfo<ts.TypeAliasDeclaration, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
  
in source:  
```ts  

export declare function parseTypeAlias(node: ts.TypeAliasDeclaration, opts: ParseOptions): types.TypeAlias;  
```  
  
Args  
  
* `node` - ts.TypeAliasDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
DeclInfo<ts.TypeAliasDeclaration, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
## `parseClass`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.ClassDeclaration, opts: ParseOptions) => Class  
```  
  
in source:  
```ts  

export declare function parseClass(node: ts.ClassDeclaration, opts: ParseOptions): types.Class;  
```  
  
Args  
  
* `node` - ts.ClassDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
Class  
```  
## `parseClassMethod`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.MethodDeclaration, opts: ParseOptions) => ClassMethod  
```  
  
in source:  
```ts  

export declare function parseClassMethod(node: ts.MethodDeclaration, opts: ParseOptions): types.ClassMethod;  
```  
  
Args  
  
* `node` - ts.MethodDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
ClassMethod  
```  
## `parseClassMember`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.ClassElement, opts: ParseOptions) => DeclInfo<ts.ClassElement, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
  
in source:  
```ts  

export declare function parseClassMember(node: ts.ClassElement, opts: ParseOptions): types.ClassMember;  
```  
  
Args  
  
* `node` - ts.ClassElement  
* `opts` - ParseOptions  
  
Returns  
```ts  
DeclInfo<ts.ClassElement, "abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static">  
```  
## `parseModuleBody`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(parentNode: ts.Node, opts: ParseOptions) => ModuleBody  
```  
  
in source:  
```ts  

export declare function parseModuleBody(parentNode: ts.Node, opts: ParseOptions): types.ModuleBody;  
```  
  
Args  
  
* `parentNode` - ts.Node  
* `opts` - ParseOptions  
  
Returns  
```ts  
ModuleBody  
```  
## `parseModule`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.ModuleDeclaration, opts: ParseOptions) => Module  
```  
  
in source:  
```ts  

export declare function parseModule(node: ts.ModuleDeclaration, opts: ParseOptions): types.Module;  
```  
  
Args  
  
* `node` - ts.ModuleDeclaration  
* `opts` - ParseOptions  
  
Returns  
```ts  
Module  
```  
## `parseSourceFile`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(node: ts.SourceFile, opts: ParseOptions) => FileInfo  
```  
  
in source:  
```ts  

export declare function parseSourceFile(node: ts.SourceFile, opts: ParseOptions): types.FileInfo;  
```  
  
Args  
  
* `node` - ts.SourceFile  
* `opts` - ParseOptions  
  
Returns  
```ts  
FileInfo  
```  
## `parseModifiers`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
(modifiers: ts.NodeArray<ts.Modifier>, opts: ParseOptions) => ("abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static")[]  
```  
  
in source:  
```ts  

export declare function parseModifiers(modifiers: ts.ModifiersArray, opts: ParseOptions): types.Modifier[];  
```  
  
Args  
  
* `modifiers` - ts.NodeArray<ts.Modifier>  
* `opts` - ParseOptions  
  
Returns  
```ts  
("abstract" | "async" | "const" | "declare" | "default" | "export" | "public" | "private" | "protected" | "readonly" | "static")[]  
```


# Types

## `ParseOptions`  
  
  
  
Modifiers: export, declare  
  
Type  
  
```ts  
any  
```  
  
in source:  
```ts  

export declare type ParseOptions = {
    checker: ts.TypeChecker;
    onlyExported?: boolean;
};  
```


