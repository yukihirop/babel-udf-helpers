import * as parser from '@babel/parser';
import { transformFromAstSync } from '@babel/core';
import { UDFHelpers } from '../../src';
import createBabelPlugin from './plugin';
import { ProgramFunc } from './types';

type Printer = {
  helpers: UDFHelpers
  programFunc: ProgramFunc
  content?: string
}

export default function printer({ helpers, programFunc, content }: Printer) {
  const ast: any = parser.parse(content || '', {
    sourceType: 'module',
  });

  const plugin = createBabelPlugin(helpers, programFunc)
  const { code } = transformFromAstSync(ast, undefined, {
    plugins: [plugin]
  }) as babel.BabelFileResult;

  return code
}

