import * as t from '@babel/types';
import * as builder from '../builder';
import { AlreadyImplementedError } from '../errors';
import { helpers as helpersStore } from '../store';
import { UDFHelperList } from '../types';

// MEMO:
// binding to an instance of BabelFile
export function addUDFHelper(name: string): t.Identifier | Array<t.Identifier> {
  let isAlreadyExist;

  /**
   * MEMO:
   *
   * availableHelper may return an error.
   * https://github.com/babel/babel/blob/3d498d05e737b6b497df55a177c113fd8167b744/packages/babel-core/src/transformation/file/file.js#L134
   */
  try {
    isAlreadyExist = this.availableHelper(name, undefined);
  } catch (e) {
    throw e;
  }
  if (isAlreadyExist)
    throw new AlreadyImplementedError(
      `${name} cannot be used because it is supported by babel official.\nPlease change the name of the helper.`
    );

  const usedPlugins = (heleprUsedMap()[name] && Array.from(heleprUsedMap()[name])) || [];

  if (usedPlugins.length > 1) {
    console.warn(`UDF helper: '${name}' is used in ${usedPlugins.join(', ')}`);
  } else if (usedPlugins.length === 0) {
    throw new ReferenceError(`Unknown UDF helper ${name}`);
  }

  const duplicated = {};
  const result = Array.from(usedPlugins).map((pluginName: string) => {
    const uid = _addUDFHelper(this, pluginName, name, duplicated);
    const helperName = uid.name.replace(/^\_/, '');
    duplicated[helperName] = duplicated[helperName] || new Set();
    duplicated[helperName].add(pluginName);
    return uid;
  });

  if (result.length === 1) {
    return result[0];
  } else {
    return result;
  }
}

function heleprUsedMap(): any {
  return Object.keys(helpersStore).reduce((acc, pluginName) => {
    (Object.keys(helpersStore[pluginName]) as any).forEach((helperName: string) => {
      acc[helperName] = acc[helperName] || new Set();
      acc[helperName].add(pluginName);
    });
    return acc;
  }, {});
}

function _addUDFHelper(file: any, pluginName: string, name: string, duplicated: any): t.Identifier {
  const isduplicated = duplicated[name] && duplicated[name].size >= 1;
  const declar = file.declarations[name];

  if (declar && !isduplicated) return t.cloneNode(declar);

  // make sure that the helper exists
  // this.constructor is babel.BabelFile class
  builder.ensure(pluginName, name, file.constructor);

  const uid = (file.declarations[name] = file.scope.generateUidIdentifier(name));

  const dependencies = {};
  for (const dep of builder.getDependencies(pluginName, name)) {
    const childUid = _addUDFHelper(file, pluginName, dep, duplicated);
    const childHelperName = childUid.name.replace(/^\_/, '');
    duplicated[childHelperName] = duplicated[childHelperName] || new Set();
    duplicated[childHelperName].add(pluginName);

    dependencies[dep] = childUid;
  }

  const { nodes, globals } = builder.buildProgram({
    pluginName,
    name,
    currentId: uid,
    currentDependencies: dependencies,
    currentLocalBindingNames: Object.keys(file.scope.getAllBindings()),
  });

  // MEMO:
  // Rename if global variables overlap
  globals.forEach((name: string) => {
    if (file.path.scope.hasBinding(name, true /* noGlobals */)) {
      file.path.scope.rename(name);
    }
  });

  // MEMO:
  // babel/generator reads _compact and compacts the output
  // https://github.com/babel/babel/blob/379e1c55937231de15ca97b475942b96983aa330/packages/babel-generator/src/printer.js#L374
  nodes.forEach((node) => {
    node._compact = true;
  });

  file.path.unshiftContainer('body', nodes);
  // MEMO:
  // NodePath# is not automatically registered in bindings, so the following code is required
  file.path.get('body').forEach((path) => {
    if (nodes.indexOf(path.node) === -1) return;
    if (path.isVariableDeclaration()) file.scope.registerDeclaration(path);
  });

  return uid;
}

// MEMO:
// binding to an instance of BabelFile
export function listUDFHelper(): UDFHelperList {
  const loadedHelpers = Object.values(helpersStore).reduce((acc, data_when_plugin) => {
    const helpers: string[] = Object.keys(data_when_plugin);
    acc.push(...helpers);
    return acc;
  }, [] as string[]);

  return loadedHelpers.reduce(
    (acc: UDFHelperList, name: string) => {
      let isAlreadyExist;

      /**
       * MEMO:
       *
       * availableHelper may return an error.
       * https://github.com/babel/babel/blob/3d498d05e737b6b497df55a177c113fd8167b744/packages/babel-core/src/transformation/file/file.js#L134
       */
      try {
        isAlreadyExist = this.availableHelper(name, undefined);
      } catch (e) {
        throw e;
      }
      if (isAlreadyExist) {
        acc.unavailable.push(name);
      } else {
        acc.available.push(name);
      }
      return acc;
    },
    { available: [], unavailable: [] }
  );
}
