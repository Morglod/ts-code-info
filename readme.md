# TypeScript Code Info

Uses [TypeScript compiler api](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to extract type info.

## Example

```ts
import { parse } from './index';

const r = parse([ './parsers.d.ts' ]);

r.files['parsers.d.ts']; {
    functions: [
        {
            modifiers: [Array],
            exported: true,
            type: '(node: Node) => boolean',
            doc: '',
            name: 'isNodeExported',
            args: [Array],
            returnType: '',
        }
    ]
}
```