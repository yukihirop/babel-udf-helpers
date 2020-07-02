import { NodePath } from '@babel/traverse';
import { BabelTypes, ProgramFunc, PreFunc } from './types';
import { useDangerousUDFHelpers, UDFHelpers } from '../../src'

export default function createBabelPlugin(helpers: UDFHelpers, programFunc: ProgramFunc, preFunc?: PreFunc) {
  // prettier-ignore
  if (!preFunc) preFunc = (pass: babel.PluginPass, helpers: UDFHelpers) => useDangerousUDFHelpers(pass, { helpers })

  return function ({ types: t }: BabelTypes) {
    return {
      name: "babel-udf-helpers-test",
      pre() {
        preFunc(this, helpers)
      },
      visitor: {
        Program(path: NodePath) {
          programFunc(this, path)
        }
      }
    }
  }
}
