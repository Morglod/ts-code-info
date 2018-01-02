# TypeScript Code Info

Uses [TypeScript compiler api](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to extract type info.

Extract info for:
* modules
* variables
* types
* functions
* classes and class members

Extracts:
* name
* documentation
* argumnets and return types
* modifiers

Also provides typescript parser's nodes (ts.Node), types and symbols for each item.

## Example: Flexible documentation generator

Check [src/example.doc.ts](src/example.doc.ts) file.

## Example: Functions list

```ts
import { parse } from './index';

const funcs = parse([ './parsers.d.ts' ])
    .files['parsers.d.ts']
    .functions
    .map(f => f.name);

console.log(funcs);
/*
[ 'isNodeExported',
  'typeOfSymbol',
  'typeOfInfo',
  'symbolInfo',
  'parseSymbol',
  'parseVariable',
  'parseParameter',
  'parseSignature',
  'parseFunc',
  'parseTypeAlias',
  'parseClass',
  'parseClassMethod',
  'parseClassMember',
  'parseModuleBody',
  'parseModule',
  'parseSourceFile',
  'parseModifiers' ]
*/
```
