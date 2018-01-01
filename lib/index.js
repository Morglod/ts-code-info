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
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var parsers_1 = require("./parsers");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWlDO0FBRWpDLHFDQUEwRDtBQUUxRCxlQUFzQixTQUFtQixFQUFFLE9BQTZGLEVBQUUsSUFBc0I7SUFBckgsd0JBQUEsRUFBQSxZQUFnQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO0lBQ3BJLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFekMsSUFBTSxNQUFNLEdBSVI7UUFDQSxPQUFPLFNBQUE7UUFDUCxPQUFPLFNBQUE7UUFDUCxLQUFLLEVBQUUsRUFBRTtLQUNaLENBQUE7SUFFRCxJQUFNLElBQUksR0FBaUI7UUFDdkIsT0FBTyxTQUFBO1FBQ1AsWUFBWSxFQUFFLElBQUk7S0FDckIsQ0FBQzs7UUFFRixHQUFHLENBQUEsQ0FBcUIsSUFBQSxLQUFBLFNBQUEsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFBLGdCQUFBO1lBQTVDLElBQU0sVUFBVSxXQUFBO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLHlCQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pFOzs7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDOztBQUNsQixDQUFDO0FBeEJELHNCQXdCQyJ9