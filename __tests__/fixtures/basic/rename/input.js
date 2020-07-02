const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.rename = helper`
  export default function _rename(){
    console.log("rename")
  }
`;
