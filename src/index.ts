import template from '@babel/template';
import * as t from '@babel/types';

export * from './types';
export { clearAll as clearAllHelpers } from './store';
export { default as useDangerousUDFHelpers } from './core_ext';

export const helper = (tpl: TemplateStringsArray) => ({
  ast: (): t.Program => template.program.ast(tpl),
});
