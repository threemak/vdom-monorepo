import { createElement } from '../lib/render.js';
export { Fragment } from '../types/dom.js';

declare const jsx: typeof createElement;
declare const jsxs: typeof createElement;
declare const jsxDev: typeof createElement;

export { jsx, jsxDev, jsxs };
