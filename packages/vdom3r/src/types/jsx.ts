import { VNode, VNodeChild, VNodeProps } from "./dom";

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
        interface Element extends VNode {}
    }
}

export {};
