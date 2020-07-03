# Define UDF Helpers

Define it the same as babel-helpers.  
The specifications are the same as for babel-helpers.

> * They must have a default export, which is their entry-point.
> * They can import other helpers, exclusively by using default imports.
> * They can't have named exports.

[@babel/helpers](https://babeljs.io/docs/en/babel-helpers#defining-helpers)

## Preparation

Be sure to write the following in the `helpers` file.  
We will define helpers in the properties of `helpers`

```js
import { helper } from 'babel-udf-helpers'

const helpers = Object.create(null);
export default helpers;

/** We will define the helper from here　*/
```

## Syntax

The basic helper looks like this:

```js
import { helper } from 'babel-udf-helpers'

const helpers = Object.create(null);
export default helpers;

/** We will define the helper from here　*/

helpers.<helperName> = helper`
  import <depHelperName1> from '<depHelperName1>'
  import <depHelperName2> from '<depHelperName2>'

  export default function _<helperName>(){
    <depHelperName1>();
    <depHelperName2>();
  };
`;

helpers.<depHelperName1> = helper`
  export default function _<depHelperName1>(){
    /** something */
  };
`;

helpers.<depHelperName2> = helper`
  export default function _<depHelperName2>(){
    /** something */
  };
`;
```

## Example

### Good

```js
import { helper } from 'babel-udf-helpers'

const helpers = Object.create(null);
export default helpers;

helpers.customHelper = helper`
  import dep from "dependency";

  const foo = 2;

  export default function _customHelper(x) {
    return foo * dep() + x;
  };
`);

helpers.dependency = helper`
  export default function _dependency(){
    return 10;
  };
`;
```

::: tip Good Point
* helpers have a default export, which is their entry-point.
* You are importing other helpers exclusively by using the default import.
* You are not using named exports.
:::

### Bad

```js
import { helper } from 'babel-udf-helpers'

const helpers = Object.create(null);
export default helpers;

helpers.customHelper = helper`
  import { dep } from 'dependency1';
  import dep2 from 'dependency2';

  const foo = 2;

  export default function _customHelper(x) {
    return foo * dep() + x;
  };
`);

helpers.dependency1 = helper`
  export default function _dependency1(){
    return {
      dep: function(){}
    }
  };
`;

helpers.dependency2 = helper`
  function _dependency2(){
    return {}
  };
`;
```

::: danger Bad Point
* Dependency import is not ImportDefaultDeclaration.
* You are importing a dependency that is not export default.
:::


## Best Practice

The most efficient way to understand helpers is to look at the [code in @babel/helpers](https://github.com/babel/babel/blob/main/packages/babel-helpers/src/helpers.js)
