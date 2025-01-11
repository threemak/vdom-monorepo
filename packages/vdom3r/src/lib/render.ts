import {
    FunctionComponent,
    VNode,
    VNodeChild,
    VNodeProps,
    VNodeTypes,
    Fragment,
} from "src/types/dom";

// Helper function to normalize children
function normalizeChildren(children: VNodeChild[]): VNodeChild[] {
    return children.reduce<VNodeChild[]>((acc, child) => {
        if (child === null || child === undefined || child === false) {
            return acc;
        }

        if (Array.isArray(child)) {
            acc.push(...normalizeChildren(child));
        } else if (typeof child === "number" || typeof child === "boolean") {
            acc.push(String(child));
        } else {
            acc.push(child);
        }

        return acc;
    }, []);
}
export function createElement(type: VNodeTypes, props: VNodeProps): VNode {
    // Handle null or undefined props
    const normalizedProps = props || {};

    // Extract special props
    const {
        key = null,
        ref = null,
        children: propsChildren,
        ...restProps
    } = normalizedProps;

    // Normalizing children to always be an array
    const normalizedChildren = normalizeChildren(
        propsChildren
            ? Array.isArray(propsChildren)
                ? propsChildren
                : [propsChildren]
            : [],
    );
    return {
        type,
        props: { ...restProps, ref: ref || undefined },
        children: normalizedChildren,
        key,
        el: null,
    };
}

function isVNode(node: unknown): node is VNode {
    return (
        node !== null &&
        typeof node === "object" &&
        "type" in node &&
        "props" in node &&
        "children" in node
    );
}

export function isFunctionComponent(
    value: unknown,
): value is FunctionComponent {
    return (
        typeof value === "function" &&
        (!("prototype" in value) || !value.prototype?.render)
    );
}

export function render(vnode: VNodeChild, container: HTMLElement): void {
    if (vnode == null) return;

    // Handle primitive values
    if (
        typeof vnode === "string" ||
        typeof vnode === "number" ||
        typeof vnode === "boolean"
    ) {
        container.appendChild(document.createTextNode(String(vnode)));
        return;
    }

    // Handle arrays
    if (Array.isArray(vnode)) {
        vnode.forEach((child) => render(child, container));
        return;
    }

    // Handle VNode
    if (!isVNode(vnode)) return;

    // Handle function components
    if (typeof vnode.type === "function") {
        const Component = vnode.type as FunctionComponent;
        const result = Component(vnode.props, { emit() {} });
        if (result) render(result, container);
        return;
    }

    // Handle Fragment
    if (vnode.type === Fragment) {
        vnode.children.forEach((child) => render(child, container));
        return;
    }

    // Create element (only for string types now)
    if (typeof vnode.type === "string") {
        const element = document.createElement(vnode.type);

        // Apply props
        if (vnode.props) {
            Object.entries(vnode.props).forEach(([key, value]) => {
                // Handle ref
                if (key === "ref" && typeof value === "function") {
                    value(element);
                    return;
                }

                // Handle event listeners
                if (key.startsWith("on") && typeof value === "function") {
                    const eventType = key
                        .slice(2)
                        .toLowerCase() as keyof HTMLElementEventMap;
                    element.addEventListener(eventType, value as EventListener);
                    return;
                }

                // Handle style object
                if (key === "style" && value && typeof value === "object") {
                    Object.assign(element.style, value);
                    return;
                }

                // Handle className
                if (key === "className" && typeof value === "string") {
                    element.className = value;
                    return;
                }

                // Handle regular attributes
                if (
                    typeof value !== "function" &&
                    typeof value !== "object" &&
                    key !== "key"
                ) {
                    element.setAttribute(key, String(value));
                }
            });
        }

        // Render children
        vnode.children.forEach((child) => render(child, element));
        container.appendChild(element);
    }
}
