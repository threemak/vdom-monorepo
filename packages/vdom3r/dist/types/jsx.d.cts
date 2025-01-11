import { VNodeProps, VNodeChild, VNode } from './dom.cjs';

declare global {
    namespace JSX {
        interface ElementChildrenAttribute {
            children: {};
        }
        interface IntrinsicAttributes {
            key?: string | number;
        }
        interface IntrinsicElements {
            [elemName: string]: VNodeProps & {
                children?: VNodeChild | VNodeChild[];
            };
        }
        interface Element extends VNode {
        }
    }
}
