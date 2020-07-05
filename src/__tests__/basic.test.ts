import { clearAllUDFHelpers } from '../';
import { writeFile } from 'fs';
import printer from './printer';
import { inputFixturePath, outputFixturePath } from './utils';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  jest.clearAllMocks();
  clearAllUDFHelpers();
});

describe('addUDFHelper', () => {
  describe('basic', () => {
    const type = 'basic';

    const dirs = ['declaration', 'dependencies'];

    for (const dir of dirs) {
      test(dir, () => {
        const helpers = require(inputFixturePath([type, dir]));
        // @ts-ignore
        const programFuncs = [(pass) => pass.addUDFHelper(dir)];
        const code = printer({ helpers, programFuncs });

        expect(code).toMatchSnapshot();
        writeFile(outputFixturePath([type, dir]), code || '', () => {});
      });
    }

    test('rename', () => {
      const dir = 'rename';
      const helpers = require(inputFixturePath([type, dir]));
      const content = `function _rename() { return "path.replaceWith" }`;
      const programFuncs = [(pass) => pass.addUDFHelper(dir)];
      // @ts-ignore
      const code = printer({ content, helpers, programFuncs });

      expect(code).toMatchSnapshot();
      writeFile(outputFixturePath([type, dir]), code || '', () => {});
    });
  });
});

describe('listUDFHelper', () => {
  describe('basic', () => {
    const type = 'basic';

    test('officialMix', () => {
      const dir = 'officialMix';
      const helpers = require(inputFixturePath([type, dir]));
      const programFuncs = [(pass) => console.log(pass.listUDFHelper())];

      // @ts-ignore
      printer({ helpers, programFuncs });
      expect((console.log as jest.Mock).mock.calls[0][0]).toMatchSnapshot();
    });
  });
});
