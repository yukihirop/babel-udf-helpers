const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.importNamed = helper`
  import { f } from 'tool'

  export default function _importNamed() {
    return "_importNamed";
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
