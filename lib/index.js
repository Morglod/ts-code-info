"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var parsers_1 = require("./parsers");
__export(require("./types"));
__export(require("./parsers"));
function parse(rootNames, options, host) {
    if (options === void 0) { options = { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS }; }
    var program = ts.createProgram(rootNames, options, host);
    var checker = program.getTypeChecker();
    var result = {
        program: program,
        checker: checker,
        files: {}
    };
    var opts = {
        checker: checker,
        onlyExported: true
    };
    try {
        for (var _a = __values(program.getSourceFiles()), _b = _a.next(); !_b.done; _b = _a.next()) {
            var sourceFile = _b.value;
            result.files[sourceFile.fileName] = parsers_1.parseSourceFile(sourceFile, opts);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
    var e_1, _c;
}
exports.parse = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWlDO0FBRWpDLHFDQUEwRDtBQUUxRCw2QkFBd0I7QUFDeEIsK0JBQTBCO0FBRTFCLGVBQXNCLFNBQW1CLEVBQUUsT0FBNkYsRUFBRSxJQUFzQjtJQUFySCx3QkFBQSxFQUFBLFlBQWdDLE1BQU0sRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7SUFDcEksSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUV6QyxJQUFNLE1BQU0sR0FJUjtRQUNBLE9BQU8sU0FBQTtRQUNQLE9BQU8sU0FBQTtRQUNQLEtBQUssRUFBRSxFQUFFO0tBQ1osQ0FBQTtJQUVELElBQU0sSUFBSSxHQUFpQjtRQUN2QixPQUFPLFNBQUE7UUFDUCxZQUFZLEVBQUUsSUFBSTtLQUNyQixDQUFDOztRQUVGLEdBQUcsQ0FBQSxDQUFxQixJQUFBLEtBQUEsU0FBQSxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUEsZ0JBQUE7WUFBNUMsSUFBTSxVQUFVLFdBQUE7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcseUJBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekU7Ozs7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7O0FBQ2xCLENBQUM7QUF4QkQsc0JBd0JDIn0=