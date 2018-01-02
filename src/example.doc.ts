import * as fs from 'fs';
import * as path from 'path';
import * as tsCode from './index';

// renderers

/** Type */
const tf = (x?: tsCode.TypeOf) => x ? x.text : '';

/** Any symbol */
const s = (x: tsCode.DeclInfo) => r([
    `## \`${x.name}\``,
    '',
    x.doc,
    '',
    x.modifiers && `Modifiers: ${x.modifiers.join(', ')}`,
    '',
    x.type && [
        'Type',
        '',
        '```ts',
        tf(x.type),
        '```'
    ],
    '',
    'in source:',
    '```ts',
    x.node.getFullText(),
    '```'
]);

/** Variables */
const v = (x: tsCode.Variable) => s(x);

/** Functions */
const f = (x: tsCode.Func) => r([
    s(x),
    '',
    [
        'Args',
        '',
        x.args.map(xarg => r([
            `* \`${xarg.name}\` - ${tf(xarg.type)}`
        ]))
    ],
    '',
    [
        'Returns',
        '```ts',
        tf(x.returnType),
        '```'
    ]
]);

/** Types */
const t = (x: tsCode.TypeAlias) => s(x);

// helpers

const r = (x: (any)[]): string =>
    x.map(y => Array.isArray(y) ? r(y) : y).filter(x => typeof x === 'string').join('  \n');

// generate!

const file = path.join(__dirname, './parsers.d.ts').replace(/\\/g, '/');

const result = tsCode.parse([ file ], require('../tsconfig.json'));
const parsersFile = result.files[file];

fs.writeFileSync('parsers.md', `
# Variables

${r(parsersFile.variables.map(v))}


# Functions

${r(parsersFile.functions.map(f))}


# Types

${r(parsersFile.types.map(t))}


`, 'utf8');