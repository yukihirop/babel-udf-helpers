import * as babel from '@babel/core';
import { UDFUsePluginOptions } from '../types';
import * as _file from './file';
import { helpers as helpersStore } from '../store';
import { AlreadyImplementedError, NotFoundError } from '../errors';

export default function useDangerousUDFHelpers(pass: babel.PluginPass, opts: UDFUsePluginOptions) {
  // addUDFHelper Function existence check
  if (
    // @ts-ignore
    typeof pass.file['addUDFHelper'] === 'function' ||
    typeof pass['addUDFHelper'] === 'function' ||
    // @ts-ignore
    typeof pass.file['listUDFHelper'] === 'function' ||
    typeof pass['listUDFHelper'] === 'function'
  )
    throw new AlreadyImplementedError(`
This tool cannot be used. officially supported.
Please see the official documentation.
https://babeljs.io/docs/en/babel-helpers
`);

  const helpers = opts['helpers'];
  if (helpers) {
    /**
     * Support import default and named
     *
     * import * as helpers from './helpers'
     * import helpers from './helpers'
     */
    Object.assign(helpersStore, helpers.default ? helpers.default : helpers);
  } else {
    throw new NotFoundError('Not found "UDF helpers"');
  }

  Object.defineProperty(pass.file, 'addUDFHelper', {
    enumerable: true,
    get: function addUDFHelper() {
      return _file.addUDFHelper.bind(pass.file);
    },
  });

  Object.defineProperty(pass, 'addUDFHelper', {
    enumerable: true,
    get: function addUDFHelper() {
      return _file.addUDFHelper.bind(pass.file);
    },
  });

  Object.defineProperty(pass.file, 'listUDFHelper', {
    enumerable: true,
    get: function listUDFHelper() {
      return _file.listUDFHelper.bind(pass.file);
    },
  });

  Object.defineProperty(pass, 'listUDFHelper', {
    enumerable: true,
    get: function listUDFHelper() {
      return _file.listUDFHelper.bind(pass.file);
    },
  });
}
