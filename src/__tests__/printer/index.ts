import * as parser from '@babel/parser';
import { transformFromAstSync } from '@babel/core';
import { UDFHelpers } from '../../';
import createBabelPlugin from './plugin';
import { ProgramFunc, PreFunc } from './types';

type Printer = {
  helpers: UDFHelpers;
  programFuncs: ProgramFunc[];
  preFunc?: PreFunc;
  content?: string;
};

export default function printer({ helpers, programFuncs, preFunc, content }: Printer) {
  const ast: any = parser.parse(content || '', {
    sourceType: 'module',
  });

  const plugins = programFuncs.map((programFunc, index) =>
    createBabelPlugin(helpers, programFunc, index, preFunc)
  );
  const { code } = transformFromAstSync(ast, undefined, {
    plugins,
  }) as babel.BabelFileResult;

  return code;
}
