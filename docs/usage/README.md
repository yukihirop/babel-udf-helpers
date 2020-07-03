# Usage

Use in your babel plugin as follows. It works the same as @babel/helpers `addHelper`,  
so you can use it anywhere in your visitor.

I made it like `@babel/helpers`, so it can be used in the same way except loading helpers.

[@babel-helpers#usage(inside a plugin)](https://babeljs.io/docs/en/babel-helpers#usage)

Only three things to do.

* 1. Define `UDF helpers`
* 2. Loading helpers in `pre()`
* 3. Use `addUDFHelpers` like addHelpers of @babel/helpers

## Try

### 1. Define Helpers

See [Define UDF Helpers](../helpers)

### 2. Loading helpers in pre()


```js
import { useDangerousUDFHelpers } from 'babel-udf-helpers';
/** 1. Define UDF helpers */
import helpers from './helpers';

export default function({types: t}){
  pre(){
    /** 2. Loading helpers in pre() */
    useDangerousUDFHelpers(this, { helpers });
  },
  visitor: {
    /** something */
  }
}
```

### 3. Use addUDFHelpers like addHelpers of @babel/helpers

```js
import { useDangerousUDFHelpers } from 'babel-udf-helpers';
/* 1. Define UDF helpers */
import helpers from './helpers';

export default function({types: t}){
  pre(){
    /* 2. Loading helpers in pre() */
    useDangerousUDFHelpers(this, { helpers });
  },
  visitor: {
    Program(path){
      /* 3. Use addUDFHelpers like addHelpers of @babel/helpers */
      const identifier = this.addUDFHelper("programHelper")
    },
    ImportDeclaration(path) {
      /* 3. Use addUDFHelpers like addHelpers of @babel/helpers */
      const identifier = this.addUDFHelper("importHelper")
    }
  }
}
```

## Tips

Once the helper is loaded, it will be retained until the execution of your babel-plugin.  
If you want to delete the helper loaded in the middle of traverse, please execute `clearAllUDFHelpers`.

```js
import { clearAllUDFHelpers } from 'babel-udf-helpers'

clearAllUDFHelpers();

this.addUDFHelper("programHelper") /* # => ReferenceError Unknown helper programHelper */
this.addHelper("typeof") /* Not Error */
```

::: warning
* Helpers defined in @babel/helpers do not disappear.
:::
