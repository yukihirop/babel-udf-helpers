# babel-udf-helpers

A tool to create user-defined helpers that can be used with babel plugin.  
The usability is like that of @babel/helpers.  

## 📦 Installation

```js
npm install --save-dev babel-udf-helpers
```

## 📖 Usage

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

`helpers.js` looks like the following.

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

## ⚽ Example

Run the plugin test with `babel-udf-helpers` in typescript and javascript.

```bash
{
  make all-deps
  make example-test
}
```

## 📝 License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing

1. Fork it ( http://github.com/yukihirop/babel-udf-helpers/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
