import { AlreadyImplementedError } from './../src/errors';
import { clearAll as clearAllHelpers } from '../src/store';
import printer from './printer';
import { inputFixturePath } from './utils';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  jest.clearAllMocks();
  clearAllHelpers();
});

describe('addUDFHelper', () => {
  describe('error', () => {
    const type = 'error';

    describe('core_ext', () => {

      test('babelAlreadyDefined', () => {
        const dir = 'babelAlreadyDefined';
        const helpers = require(inputFixturePath([type, dir]));
        const programFunc = (pass) => pass.addUDFHelper('objectWithoutProperties');

        expect(() => {
          printer({ helpers, programFunc });
        }).toThrowError(
          new AlreadyImplementedError(
            'unknown: objectWithoutProperties cannot be used because it is supported by babel official.\nPlease change the name of the helper.'
          )
        );
        expect(() => {
          printer({ helpers, programFunc });
        }).toThrowErrorMatchingSnapshot();
      });
    });

    describe('DependencyResolvePlugin', () => {
      // prettier-ignore
      const cases = [
        { dir: 'doNotExist', err: new Error('unknown: Unknown helper doNotExist') },
        { dir: 'importNamed', err: new SyntaxError('unknown: UDF Helpers can only import a default value (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'doNotGiveName', err: new SyntaxError('unknown: UDF Helpers should give names to their exported func declaration (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'expression', err: new SyntaxError('unknown: UDF Helpers must be a function declaration (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'exportAll', err: new SyntaxError('unknown: UDF Helpers can only export default (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'exportNamed', err: new SyntaxError('unknown: UDF Helpers can only export default (This is an error on an internal node. Probably an internal error.)') },
        { dir: 'doNotExportDefault', err: new Error('unknown: UDF Helpers must default-export something.') },
      ];

      for (const c of cases) {
        const { dir, err } = c;

        test(dir, () => {
          const helpers = require(inputFixturePath([type, dir]));
          const programFunc = (pass) => pass.addUDFHelper(dir);

          // prettier-ignore
          expect(() => { printer({ helpers, programFunc }); }).toThrowError(err);
          // prettier-ignore
          expect(() => { printer({ helpers, programFunc }); }).toThrowErrorMatchingSnapshot();
        });
      }
    });
  });
});
