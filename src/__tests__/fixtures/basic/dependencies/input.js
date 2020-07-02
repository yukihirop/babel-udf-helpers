const { helper } = require('../..');

const helpers = Object.create(null);
module.exports = helpers;

helpers.dependencies = helper`
  import child1 from "child1";
  import child2 from "child2";

  export default function _dependencies(){
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
