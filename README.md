# babel-udf-helpers

A tool to create user-defined helpers that can be used with babel plugin.  
The usability is like that of babel-helpers.  

## Usage

Use in your babel plugin as follows.  
It works the same as babel-helpers addHelper, so you can use it anywhere in your visitor.  

```js
import { useDangerousUDFHelpers } from 'babel-udf-helpers';
import helpers from './helpers';

export default function({types: t}){
  pre(){
    useDangerousUDFHelpers(this, { helpers });
  },
  visitor: {
    Program(path){
      this.addUDFHelper("programHelper")
    },
    ImportDeclaration(path) {
      this.addUDFHelper("importHelper")
    }
  }
}
```

helpers.js looks like the following.

```js
import { helper } from 'babel-udf-helpers';

const helpers = Object.create(null);
export default helpers;

helpers.programHelper = helper`
  export default function _programHelper(){
    return "programHelper";
  };
`

helpers.importHelper = helper`
  export default function _importHelper(){
    return "importHelper";
  };
`
```

## Example

Run the plugin test with `babel-udf-helpers` in typescript and javascript.

```bash
{
  make all-deps
  make example-test
}
```
