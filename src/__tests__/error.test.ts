import { useDangerousUDFHelpers } from '../';
import { AlreadyImplementedError, NotFoundError } from './../errors';
import { clearAllUDFHelpers } from '../';
import printer from './printer';
import { inputFixturePath } from './utils';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  jest.clearAllMocks();
  clearAllUDFHelpers();
});

describe('addUDFHelper', () => {
  describe('error', () => {
    const type = 'error';

    describe('core_ext', () => {
      describe('babelImplemented', () => {
        // prettier-ignore
        const cases = [
          {
            method: 'BabelFile#addUDFHelper',
            preFunc: (pass, helpers) => {
              try {
                pass.file.constructor.prototype.addUDFHelper = function () { };
                useDangerousUDFHelpers(pass, helpers);
              } catch (e) {
                pass.file.constructor.prototype.addUDFHelper = undefined;
                throw e
              }
            }
          },
          {
            method: 'BabelFile#listUDFHelper',
            preFunc: (pass, helpers) => {
              try {
                pass.file.constructor.prototype.listUDFHelper = function () { };
                useDangerousUDFHelpers(pass, helpers);
              } catch (e) {
                pass.file.constructor.prototype.listUDFHelper = undefined;
                throw e
              }
            }
          },
        ];

        for (const c of cases) {
          const { method, preFunc } = c;
          test(method, () => {
            const dir = 'declaration';
            const helpers = require(inputFixturePath(['basic', dir]));
            const programFuncs = [(pass) => pass.addUDFHelper('declaration')];

            // prettier-ignore
            expect(() => { printer({ helpers, programFuncs, preFunc }); }).toThrowError(new AlreadyImplementedError(
              `unknown:\
 \nThis tool cannot be used. officially supported.
Please see the official documentation.
https://babeljs.io/docs/en/babel-helpers
`));
            // prettier-ignore
            expect(() => { printer({ helpers, programFuncs, preFunc }); }).toThrowErrorMatchingSnapshot();
          });
        }
      });

      test('Not found UDF helpers', () => {
        const programFuncs = [(pass) => pass.addUDFHelper('objectWithoutProperties')];

        // prettier-ignore
        expect(() => { printer({ programFuncs } as any); }).toThrowError(new NotFoundError('unknown: Not found UDF helpers.'));
        // prettier-ignore
        expect(() => { printer({ programFuncs } as any); }).toThrowErrorMatchingSnapshot();
      });

      test('babelAlreadyDefined', () => {
        const dir = 'babelAlreadyDefined';
        const helpers = require(inputFixturePath([type, dir]));
        const programFuncs = [(pass) => pass.addUDFHelper('objectWithoutProperties')];

        // prettier-ignore
        expect(() => { printer({ helpers, programFuncs }); }).toThrowError(new AlreadyImplementedError('unknown: objectWithoutProperties cannot be used because it is supported by babel official.\nPlease change the name of the helper.'));
        // prettier-ignore
        expect(() => { printer({ helpers, programFuncs }); }).toThrowErrorMatchingSnapshot();
      });
    });

    describe('DependencyResolvePlugin', () => {
      // prettier-ignore
      const cases = [
        { dir: 'doNotExist', err: new ReferenceError('unknown: Unknown helper doNotExist') },
        { dir: 'importNamed', err: new SyntaxError('unknown: UDF Helpers can only import a default value (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'doNotGiveName', err: new SyntaxError('unknown: UDF Helpers should give names to their exported func declaration (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'expression', err: new SyntaxError('unknown: UDF Helpers must be a function declaration (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'exportAll', err: new SyntaxError('unknown: UDF Helpers can only export default (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'exportNamed', err: new SyntaxError('unknown: UDF Helpers can only export default (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'doNotExportDefault', err: new SyntaxError('unknown: UDF Helpers must default-export something.') },
      ];

      for (const c of cases) {
        const { dir, err } = c;

        test(dir, () => {
          const helpers = require(inputFixturePath([type, dir]));
          const programFuncs = [(pass) => pass.addUDFHelper(dir)];

          // prettier-ignore
          expect(() => { printer({ helpers, programFuncs }); }).toThrowError(err);
          // prettier-ignore
          expect(() => { printer({ helpers, programFuncs }); }).toThrowErrorMatchingSnapshot();
        });
      }
    });
  });
});
