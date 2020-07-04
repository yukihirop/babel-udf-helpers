import * as parser from '@babel/parser';
import { transformFromAstSync } from '@babel/core';
import { UDFHelpers } from '../../';
import createBabelPlugin from './plugin';
import { ProgramFunc, PreFunc } from './types';

type Printer = {
  helpers: UDFHelpers;
  programFunc: ProgramFunc;
  preFunc?: PreFunc;
  content?: string;
};

export default function printer({ helpers, programFunc, content, preFunc }: Printer) {
  const ast: any = parser.parse(content || '', {
    sourceType: 'module',
  });

  const plugin = createBabelPlugin(helpers, programFunc, preFunc);
  const { code } = transformFromAstSync(ast, undefined, {
    plugins: [plugin],
  }) as babel.BabelFileResult;

  return code;
}
