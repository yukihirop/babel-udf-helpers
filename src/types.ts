import * as t from '@babel/types';

export type UDFPluginOptions = { [key: string]: any };
export type UDFUsePluginOptions = {
  helpers: { [key: string]: UDFHelper };
};
export type UDFHelper = {
  ast: () => t.Program;
};
export type UDFHelpers = {
  [key: string]: UDFHelper;
};
export type UDFNamespacedHelpers = {
  [key: string]: {
    [key: string]: UDFHelper;
  };
};
export type UDFHelperList = {
  available: string[];
  unavailable: string[];
};
