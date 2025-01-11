import { FunctionComponent, VNode, VNodeChild } from "src/types/dom";

type DiffResult = {
    typeChanged?: boolean;
    propsChanged?: Record<string, any>;
    childrenChanged?: VNodeChild[];
};

export function diff(
    oldVNode: VNodeChild,
    newVNode: VNodeChild,
): DiffResult | null {
    if (oldVNode === newVNode) return null;

    const result: DiffResult = {};

    // Handle primitive values
    if (typeof oldVNode !== typeof newVNode) {
        return { typeChanged: true };
    }

    if (
        typeof oldVNode === "string" ||
        typeof oldVNode === "number" ||
        typeof oldVNode === "boolean"
    ) {
        if (oldVNode !== newVNode) {
            return { typeChanged: true };
        }
        return null;
    }

    // Handle arrays
    if (Array.isArray(oldVNode) && Array.isArray(newVNode)) {
        const childrenChanged: VNodeChild[] = [];
        const maxLength = Math.max(oldVNode.length, newVNode.length);
        for (let i = 0; i < maxLength; i++) {
            const childDiff = diff(oldVNode[i], newVNode[i]);
            if (childDiff) {
                childrenChanged.push(newVNode[i]);
            }
        }
        if (childrenChanged.length > 0) {
            result.childrenChanged = childrenChanged;
        }
        return Object.keys(result).length > 0 ? result : null;
    }

    // Handle VNodes
    if (isVNode(oldVNode) && isVNode(newVNode)) {
        // Compare types
        if (oldVNode.type !== newVNode.type) {
            result.typeChanged = true;
        }

        // Compare props
        const propsChanged: Record<string, any> = {};
        const oldProps = oldVNode.props || {};
        const newProps = newVNode.props || {};
        const allProps = new Set([
            ...Object.keys(oldProps),
            ...Object.keys(newProps),
        ]);
        allProps.forEach((key) => {
            if (oldProps[key] !== newProps[key]) {
                propsChanged[key] = newProps[key];
            }
        });
        if (Object.keys(propsChanged).length > 0) {
            result.propsChanged = propsChanged;
        }

        // Compare children
        const childrenChanged: VNodeChild[] = [];
        const maxLength = Math.max(
            oldVNode.children.length,
            newVNode.children.length,
        );
        for (let i = 0; i < maxLength; i++) {
            const childDiff = diff(oldVNode.children[i], newVNode.children[i]);
            if (childDiff) {
                childrenChanged.push(newVNode.children[i]);
            }
        }
        if (childrenChanged.length > 0) {
            result.childrenChanged = childrenChanged;
        }

        return Object.keys(result).length > 0 ? result : null;
    }

    return { typeChanged: true };
}

// Function to check if a node is a VNode
export function isVNode(node: unknown): node is VNode {
    return (
        node !== null &&
        typeof node === "object" &&
        "type" in node &&
        "props" in node &&
        "children" in node
    );
}

// Function to check if a value is a function component
export function isFunctionComponent(
    value: unknown,
): value is FunctionComponent {
    return (
        typeof value === "function" &&
        (!("prototype" in value) || !value.prototype?.render)
    );
}
