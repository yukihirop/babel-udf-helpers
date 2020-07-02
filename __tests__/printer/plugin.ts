import { NodePath } from '@babel/traverse';
import { BabelTypes, ProgramFunc } from './types';
import { useDangerousUDFHelpers, UDFHelpers } from '../../src'

export default function createBabelPlugin(helpers: UDFHelpers, programFunc: ProgramFunc) {
  return function ({ types: t }: BabelTypes) {
    return {
      name: "babel-udf-helpers-test",
      pre() {
        useDangerousUDFHelpers(this, { helpers })
      },
      visitor: {
        Program(path: NodePath) {
          programFunc(this, path)
        }
      }
    }
  }
}
