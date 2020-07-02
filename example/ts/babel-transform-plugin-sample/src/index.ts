import { NodePath } from '@babel/traverse';
import { useDangerousUDFHelpers } from 'babel-udf-helpers';
import { BabelTypes } from './types';
import helpers from './helpers';

export default function ({ types: t }: BabelTypes) {
  return {
    name: 'babel-transform-plugin-sample',
    pre() {
      useDangerousUDFHelpers(this, { helpers });
    },
    visitor: {
      Program(path: NodePath) {
        this.addUDFHelper('sampleUDFHelper');
      },
    },
  };
}
