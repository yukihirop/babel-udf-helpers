const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.doNotExportDefault = helper`
  function _doNotExportDefault(){
    return "_doNotExportDefault"
  }
`;
