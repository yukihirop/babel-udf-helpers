import plugin from '../index';
import pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin,
  tests: [
    {
      title: 'this.addUDFHelper("sampleUDFHelper")',
      code: `function a(){}`,
      output: `
function _sampleUDFHelper() {
  cild1() || _child2();
}

function _child2() {
  _grandchild();
}

function _grandchild() {
  return 'grandchild';
}

function _child() {
  return 'child1';
}

function a() {}

`
    },
  ],
});
