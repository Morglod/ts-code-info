import { parse } from './index';

const r = parse([ './parsers.d.ts' ], require('../tsconfig.json'));
console.log(r.files['parsers.d.ts']);