import { VNodeTypes, VNodeProps, VNode, FunctionComponent, VNodeChild } from '../types/dom.js';

declare function createElement(type: VNodeTypes, props: VNodeProps): VNode;
declare function isFunctionComponent(value: unknown): value is FunctionComponent;
declare function render(vnode: VNodeChild, container: HTMLElement): void;

export { createElement, isFunctionComponent, render };
