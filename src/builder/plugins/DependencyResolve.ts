import { UDFPluginOptions } from '../../types';
import traverse, { NodePath } from '@babel/traverse';
import { makePath } from './utils';
import { helpers as helpersStore } from '../../store';

export default function DependencyResolve(file: babel.BabelFile, options?: UDFPluginOptions): void {
  const { opts } = file;
  const { iDependencies, iImportPaths } = opts as any;

  const visitor = {
    ImportDeclaration(path: NodePath) {
      // @ts-ignore
      const name = path.node.source.value;

      if (!helpersStore[name]) {
        throw new ReferenceError(`Unknown UDF helper ${name}`);
      }

      if (
        // @ts-ignore
        path.get('specifiers').length !== 1 ||
        // @ts-ignore
        !path.get('specifiers.0').isImportDefaultSpecifier()
      ) {
        throw path.buildCodeFrameError('UDF Helpers can only import a default value');
      }

      // @ts-ignore
      const bindingIdentifier = path.node.specifiers[0].local;
      // STEP 1: Specify dependencies
      iDependencies.set(bindingIdentifier, name);
      // STEP 2: Specify import path
      iImportPaths.push(makePath(path));
    },
    ExportDefaultDeclaration(path: NodePath) {
      const declar = path.get('declaration');

      // MEMO:
      // Error if not a named function declaration
      // @ts-ignore
      if (declar.isFunctionDeclaration()) {
        // @ts-ignore
        if (!declar.node.id) {
          // @ts-ignore
          throw declar.buildCodeFrameError(
            'UDF Helpers should give names to their exported func declaration'
          );
        }

        // STEP 3: Each helper has only one export default name. keep its name
        // @ts-ignore
        opts['iExportName'] = declar.node.id.name;
      } else {
        // @ts-ignore
        throw declar.buildCodeFrameError('UDF Helpers must be a function declaration');
      }

      // STEP 4: Each helper has only one export default path. keep its name
      // @ts-ignore
      opts['iExportPath'] = makePath(path);
    },
    ExportAllDeclaration(path: NodePath) {
      throw path.buildCodeFrameError('UDF Helpers can only export default');
    },
    ExportNamedDeclaration(path: NodePath) {
      throw path.buildCodeFrameError('UDF Helpers can only export default');
    },
    Statement(path: NodePath) {
      if (path.isModuleDeclaration()) return;

      path.skip();
    },
  };

  traverse(file.ast, visitor as any, file.scope);

  if (!opts['iExportName']) throw new SyntaxError('UDF Helpers must default-export something.');
}
