import { join } from 'path';
export const fixtureBasePath = join(__dirname, 'fixtures');
export const inputFixturePath = (dirs: string[]) => join(fixtureBasePath, ...dirs, 'input.js');
export const outputFixturePath = (dirs: string[]) => join(fixtureBasePath, ...dirs, 'output.js');
