const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.dependencies = helper`
  import child from "child";
  import child2 from "child2";

  export default function _dependencies(){
    child() || child2()
  };
`;

helpers.child = helper`
  export default function _child(){
    return "child"
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
