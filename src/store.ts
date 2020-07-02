import { UDFHelpers } from './types';

export let helpers = Object.create(null) as UDFHelpers;

export function clearAll() {
  clearHelpers();
}

export function clearHelpers() {
  helpers = Object.create(null) as UDFHelpers;
}
