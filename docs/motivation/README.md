# Motivation

I think that most users who create babel-transform-plugin etc.
have responded by writing AST using `@babel/types` or automatically generating AST using `@babel/template`.
However, some users may have encountered the following issues.  

* You have to write a lot of AST to achieve what You want to do.  
* Global variable name collision in code trying to traverse.  

The problem that can't be solved without writing a lot of AST can be solved to some extent by using `@babel/template`,
but the name conflict of global variables cannot be solved and the same code tends to be repeated because you cannot define dependencies between functions.

`@babel/helpers` solved both problems. But it didn't give the user a way to define helpers.  

Therefore, this time, I made a tool like `@babel/heleprs` that can be used by defining a helper as a user-defined function (UDF). 

I hope your development of babel-transform-plugin will be easier. :smile:
