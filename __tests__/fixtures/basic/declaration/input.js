const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.declaration = helper`
  export default function _declaration(){
    console.log("declaration")
  }
`;
