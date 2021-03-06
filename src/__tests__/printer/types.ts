import * as t from '@babel/types';
import { UDFHelpers } from './../../types';
import { NodePath } from '@babel/traverse';

export type BabelTypes = {
  types: typeof t;
};
export type ProgramFunc = (pass: babel.PluginPass, path?: NodePath) => void;
export type PreFunc = (pass: babel.PluginPass, helpers: UDFHelpers) => void;
