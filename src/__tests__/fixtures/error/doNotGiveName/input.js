const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.doNotGiveName = helper`
  export default function(){
    return "doNotGiveName"
  }
`;
