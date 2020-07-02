# babel-transform-plugin-sample (js)

JavaScript Example of using [babel-udf-helpers](https://github.com/yukihirop/babel-udf-helpers) in babel-transform-plugin.

## Transform Code

The code in After has no practical meaning.😅

### Before

```js
var a;
```

### After

```js
function _sampleUDFHelper() {
  cild1() || _child2();
}

function _child2() {
  _grandchild();
}

function _grandchild() {
  return 'grandchild';
}

function _child() {
  return 'child1';
}

var a;
```

## Setup

First, generate the `babel-udf-helpers` lib file.  
Then yarn

```bash
{
  cd ../../.. && yarn build && cd -
  yarn
}
```

## Test

```bash
yarn test
```

## Build

```bash
yarn build
```
