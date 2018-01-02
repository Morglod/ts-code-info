"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var tsCode = require("./index");
// renderers
/** Type */
var tf = function (x) { return x ? x.text : ''; };
/** Any symbol */
var s = function (x) { return r([
    "## `" + x.name + "`",
    '',
    x.doc,
    '',
    x.modifiers && "Modifiers: " + x.modifiers.join(', '),
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
]); };
/** Variables */
var v = function (x) { return s(x); };
/** Functions */
var f = function (x) { return r([
    s(x),
    '',
    [
        'Args',
        '',
        x.args.map(function (xarg) { return r([
            "* `" + xarg.name + "` - " + tf(xarg.type)
        ]); })
    ],
    '',
    [
        'Returns',
        '```ts',
        tf(x.returnType),
        '```'
    ]
]); };
/** Types */
var t = function (x) { return s(x); };
// helpers
var r = function (x) {
    return x.map(function (y) { return Array.isArray(y) ? r(y) : y; }).filter(function (x) { return typeof x === 'string'; }).join('  \n');
};
// generate!
var file = path.join(__dirname, './parsers.d.ts').replace(/\\/g, '/');
var result = tsCode.parse([file], require('../tsconfig.json'));
var parsersFile = result.files[file];
fs.writeFileSync('parsers.md', "\n# Variables\n\n" + r(parsersFile.variables.map(v)) + "\n\n\n# Functions\n\n" + r(parsersFile.functions.map(f)) + "\n\n\n# Types\n\n" + r(parsersFile.types.map(t)) + "\n\n\n", 'utf8');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5kb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXhhbXBsZS5kb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1QkFBeUI7QUFDekIsMkJBQTZCO0FBQzdCLGdDQUFrQztBQUVsQyxZQUFZO0FBRVosV0FBVztBQUNYLElBQU0sRUFBRSxHQUFHLFVBQUMsQ0FBaUIsSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFmLENBQWUsQ0FBQztBQUVsRCxpQkFBaUI7QUFDakIsSUFBTSxDQUFDLEdBQUcsVUFBQyxDQUFrQixJQUFLLE9BQUEsQ0FBQyxDQUFDO0lBQ2hDLFNBQVEsQ0FBQyxDQUFDLElBQUksTUFBSTtJQUNsQixFQUFFO0lBQ0YsQ0FBQyxDQUFDLEdBQUc7SUFDTCxFQUFFO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsSUFBSSxnQkFBYyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUc7SUFDckQsRUFBRTtJQUNGLENBQUMsQ0FBQyxJQUFJLElBQUk7UUFDTixNQUFNO1FBQ04sRUFBRTtRQUNGLE9BQU87UUFDUCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLEtBQUs7S0FDUjtJQUNELEVBQUU7SUFDRixZQUFZO0lBQ1osT0FBTztJQUNQLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0lBQ3BCLEtBQUs7Q0FDUixDQUFDLEVBbkJnQyxDQW1CaEMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQixJQUFNLENBQUMsR0FBRyxVQUFDLENBQWtCLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUosQ0FBSSxDQUFDO0FBRXZDLGdCQUFnQjtBQUNoQixJQUFNLENBQUMsR0FBRyxVQUFDLENBQWMsSUFBSyxPQUFBLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osRUFBRTtJQUNGO1FBQ0ksTUFBTTtRQUNOLEVBQUU7UUFDRixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQztZQUNqQixRQUFPLElBQUksQ0FBQyxJQUFJLFlBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUc7U0FDMUMsQ0FBQyxFQUZpQixDQUVqQixDQUFDO0tBQ047SUFDRCxFQUFFO0lBQ0Y7UUFDSSxTQUFTO1FBQ1QsT0FBTztRQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ2hCLEtBQUs7S0FDUjtDQUNKLENBQUMsRUFqQjRCLENBaUI1QixDQUFDO0FBRUgsWUFBWTtBQUNaLElBQU0sQ0FBQyxHQUFHLFVBQUMsQ0FBbUIsSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBSixDQUFJLENBQUM7QUFFeEMsVUFBVTtBQUVWLElBQU0sQ0FBQyxHQUFHLFVBQUMsQ0FBVTtJQUNqQixPQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFBdkYsQ0FBdUYsQ0FBQztBQUU1RixZQUFZO0FBRVosSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhFLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBRSxJQUFJLENBQUUsRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBQ25FLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsc0JBRzdCLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyw2QkFLL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHlCQUsvQixDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FHNUIsRUFBRSxNQUFNLENBQUMsQ0FBQyJ9