import { createElement } from '../lib/render.cjs';
export { Fragment } from '../types/dom.cjs';

declare const jsx: typeof createElement;
declare const jsxs: typeof createElement;
declare const jsxDev: typeof createElement;

export { jsx, jsxDev, jsxs };
