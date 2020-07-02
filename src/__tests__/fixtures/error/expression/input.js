const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.expression = helper`
  var _expression = function _expression() {
    return "expression"
  };

  export default _expression;
`;
