import * as ts from 'typescript';
import * as types from './types';
import { ParseOptions, parseSourceFile } from './parsers';

export function parse(rootNames: string[], options: ts.CompilerOptions = { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS }, host?: ts.CompilerHost) {
    const program = ts.createProgram(rootNames, options, host);
    const checker = program.getTypeChecker();

    const result: {
        program: ts.Program,
        checker: ts.TypeChecker,
        files: { [fileName: string]: types.FileInfo }
    } = {
        program,
        checker,
        files: {}
    }

    const opts: ParseOptions = {
        checker,
        onlyExported: true
    };

    for(const sourceFile of program.getSourceFiles()) {
        result.files[sourceFile.fileName] = parseSourceFile(sourceFile, opts);
    }

    return result;
}
