const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.exportAll = helper`
  export * from 'tool';

  export default function _exportAll(){
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
