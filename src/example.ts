import { parse } from './index';

const funcs = parse([ './parsers.d.ts' ])
    .files['parsers.d.ts']
    .functions
    .map(f => f.name);

console.log(funcs);