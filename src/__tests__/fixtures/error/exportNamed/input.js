const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.exportNamed = helper`
  export { f } from 'tool';

  export default function _exportNamed(){
    return "_exportAll";
  };
`;

helpers.tool = helper`
  export default function _tool() {
    function f(){
      return "f"
    };

    return {
      f
    };
  };
`;
