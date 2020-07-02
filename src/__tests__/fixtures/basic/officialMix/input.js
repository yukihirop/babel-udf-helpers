const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.officialMix = helper`
  import child1 from "child1";
  import child2 from "child2";

  export default function _officialMix(){
    cild1() || child2()
  };
`;

helpers.child1 = helper`
  export default function _child1(){
    return "child1"
  };
`;

helpers.child2 = helper`
  import grandchild from "grandchild";

  export default function _child2(){
    grandchild()
  };
`;

helpers.grandchild = helper`
  export default function _grandchild(){
    return "grandchild"
  };
`;

/** ↓↓ official babel helpers ↓↓ */

helpers.objectWithoutPropertiesLoose = helper`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
`;

helpers.objectWithoutProperties = helper`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";
  
  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
`;
