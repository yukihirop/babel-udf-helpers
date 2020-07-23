import { UDFNamespacedHelpers } from './types';

export let helpers = Object.create(null) as UDFNamespacedHelpers;

export function clearAll() {
  clearHelpers();
}

export function clearHelpers() {
  helpers = Object.create(null) as UDFNamespacedHelpers;
}
