import { useDangerousUDFHelpers } from 'babel-udf-helpers';
import helpers from './helpers';

export default function ({ types: t }) {
  return {
    name: 'babel-transform-plugin-sample',
    pre() {
      useDangerousUDFHelpers(this, { helpers });
    },
    visitor: {
      Program(path) {
        this.addUDFHelper('sampleUDFHelper');
      },
    },
  };
}
