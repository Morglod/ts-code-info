import * as ts from 'typescript';
import * as types from './types';
export declare function parse(rootNames: string[], options?: ts.CompilerOptions, host?: ts.CompilerHost): {
    program: ts.Program;
    checker: ts.TypeChecker;
    files: {
        [fileName: string]: types.FileInfo;
    };
};
