import { NodePath } from '@babel/traverse';

export type BabelTypes = {
  types: typeof t;
};
export type ProgramFunc = (pass: babel.PluginPass, path: NodePath) => {}
