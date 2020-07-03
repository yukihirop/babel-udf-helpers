# Error Handling


Since this tool is a core extension tool of `@babel/core`, an error will occur when there is a risk of overwriting the original function of `@babel/core` so that it can be used safely. In addition, if the definition of helpers does not follow the rules, an error will be issued.


## Error List

|Error|When|Description|
|-----|----|-----------|
|<kbd>AlreadyImplementedError</kbd>|core extension|unknown:This tool cannot be used. officially supported.\nPlease see the official documentation.https://babeljs.io/docs/en/babel-helpers|
|<kbd>AlreadyImplementedError</kbd>|core extension|unknown: objectWithoutProperties cannot be used because it is supported by babel official.\nPlease change the name of the helper.|
|<kbd>NotFoundError</kbd>|core extension|unknown: Not found UDF helpers.|
|<kbd>ReferenceError</kbd>|traverse helpers|unknown: Unknown helper <kbd>helperName</kbd>|
|<kbd>SyntaxError</kbd>|traverse helpers|unknown: UDF Helpers can only import a default value (This is an error on an internal node. Probably an internal error.)|
|<kbd>SyntaxError</kbd>|traverse helpers|unknown: UDF Helpers should give names to their exported func declaration (This is an error on an internal node. Probably an internal error.)|
|<kbd>SyntaxError</kbd>|traverse helpers|unknown: UDF Helpers must be a function declaration (This is an error on an internal node. Probably an internal error.)|
|<kbd>SyntaxError</kbd>|traverse helpers|unknown: UDF Helpers can only export default (This is an error on an internal node. Probably an internal error.)|
|<kbd>SyntaxError</kbd>|traverse helpers|unknown: UDF Helpers can only export default (This is an error on an internal node. Probably an internal error.)|
|<kbd>SyntaxError</kbd>|traverse helpers|unknown: UDF Helpers must default-export something.|

See the [tests](https://github.com/yukihirop/babel-udf-helpers/blob/master/src/__tests__/error.test.ts) if you want to know exactly when the error occurred.
