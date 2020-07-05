# API

`this` is bindd to an instance of [PluginPass](https://github.com/babel/babel/blob/c664fbdd07d0a510d5bcb42b4d1776e9354696ad/packages/babel-core/src/transformation/plugin-pass.js#L6)

## useDangerousUDFHelpers

Load the `helpers` into the internal store and define `addUDFHelper` and `listUDFHelper` in the [PluginPass instance](https://github.com/babel/babel/blob/c664fbdd07d0a510d5bcb42b4d1776e9354696ad/packages/babel-core/src/transformation/plugin-pass.js#L6) and [File instance](https://github.com/babel/babel/blob/c664fbdd07d0a510d5bcb42b4d1776e9354696ad/packages/babel-core/src/transformation/file/file.js#L34) with the core extension.

### definition

```ts
function useDangerousUDFHelpers(pass: babel.PluginPass, { helpers }: UDFUsePluginOptions): void
```

### types

```ts
type UDFHelper = {
  ast: () => t.Program;
};

type UDFUsePluginOptions = {
  helpers: { [key: string]: UDFHelper };
};
```

### example

```ts
import { useDangerousUDFHelpers } from 'babel-udf-helpers';
import helpers from './helpers';

export default function({types: t}){
  pre(){
    useDangerousUDFHelpers(this, { helpers });
  }
}
```

## addUDFHelper(name)

Add a helper function to the beginning of the program body of the code you are trying to traverse.
The return type is `t.Identifier`.

### definition

```ts
addUDFHelper(name: string): t.Identifier
```

### example

```ts
visitor: {
  Program(path){
    // e.g.) identifier is { type: 'identifier', name: '_programHelper' }
    const identifier = this.addUDFHelper("programHelper")
  }
}
```

## listUDFHelper

Returns a list of helpers you have defined.
The return type is `UDFHelperList`.

### definition

```ts
listUDFHelper(): UDFHelperList
```

### types

```ts
type UDFHelperList = {
  available: string[];
  unavailable: string[];
};
```

### example

Below is an example when a helper called `objectWithoutProperties` defined in @babel/helpers is defined as UDF.

`objectWithoutProperties` cannot be used as UDFHelpers, so it returns as unavailable.

```ts
visitor: {
  Program(path){
    /**
     * e.g.) result is
     * 
     * {
     *   "available": [
     *     "parentHelper",
     *     "child1",
     *     "child2",
     *     "grandchild",
     *   ],
     *   "unavailable": [
     *     "objectWithoutPropertiesLoose",
     *     "objectWithoutProperties",
     *   ],
     * }
     * 
     * 
     */
    const result = this.listUDFHelper()
  }
}
```

## clearAllUDFHelpers

Initialize the store that holds helpers read by `useDangerousUDFHelpers`.

After doing this, the UDF helpers will not be recognized and you will not be able to use `addUDFHelper` or `listUDFHelper`.

If you run `useDangerousUDFHelpers(this, { helpers })` again, you will be able to use it again.

### definition

```ts
funciton clearAllUDFHelpers(): void
```

See [Usage#Tips](../usage/#tips)

## helper(tpl)

Provides methods to define UDF helpers.

### definition

```ts
helper(tpl: TemplateStringsArray): UDFHelper
```

### types

```ts
type UDFHelper = {
  ast: () => t.Program;
};
```

See [Define UDF Helpers](../define-udf-helpers/)
