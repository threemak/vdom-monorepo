import { diff } from "./diffing";

// Render function to render VNode to a container
export function render(vnode: VNodeChild, container: HTMLElement): void {
    // Function to apply props to an element
    const applyProps = (element: HTMLElement, props: VNodeProps) => {
        Object.entries(props).forEach(([key, value]) => {
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
    };

    // Recursive function to render a vnode
    const renderVNode = (
        vnode: VNodeChild,
        container: HTMLElement,
        oldVNode?: VNodeChild,
    ) => {
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
            vnode.forEach((child) => renderVNode(child, container));
            return;
        }

        // Handle VNode
        if (!isVNode(vnode)) return;

        // Handle function components
        if (typeof vnode.type === "function") {
            const Component = vnode.type as FunctionComponent;
            const result = Component(vnode.props, {
                emit: () => {},
            });
            if (result) renderVNode(result, container, oldVNode);
            return;
        }

        // Handle Fragment
        if (vnode.type === "Fragment") {
            vnode.children.forEach((child) => renderVNode(child, container));
            return;
        }

        // Create or update element
        let element: HTMLElement;
        if (oldVNode && isVNode(oldVNode) && oldVNode.type === vnode.type) {
            element = container.querySelector(
                `[data-key="${oldVNode.props.key}"]`,
            ) as HTMLElement;
            if (element) {
                // Update props
                applyProps(element, vnode.props);

                // Update children
                const childrenDiff = diff(oldVNode.children, vnode.children);
                if (childrenDiff && childrenDiff.childrenChanged) {
                    element.innerHTML = "";
                    vnode.children.forEach((child) =>
                        renderVNode(child, element),
                    );
                }
            } else {
                element = document.createElement(vnode.type as string);
                applyProps(element, vnode.props);
                vnode.children.forEach((child) => renderVNode(child, element));
                container.appendChild(element);
            }
        } else {
            element = document.createElement(vnode.type as string);
            applyProps(element, vnode.props);
            vnode.children.forEach((child) => renderVNode(child, element));
            container.appendChild(element);
        }
    };

    renderVNode(vnode, container);
}

export function isVNode(node: unknown): node is VNode {
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

//export function render(vnode: VNodeChild, container: HTMLElement): void {
//    if (vnode == null) return;
//
//    // Handle primitive values
//    if (
//        typeof vnode === "string" ||
//        typeof vnode === "number" ||
//        typeof vnode === "boolean"
//    ) {
//        container.appendChild(document.createTextNode(String(vnode)));
//        return;
//    }
//
//    // Handle arrays
//    if (Array.isArray(vnode)) {
//        vnode.forEach((child) => render(child, container));
//        return;
//    }
//
//    // Handle VNode
//    if (!isVNode(vnode)) return;
//
//    // Handle function components
//    if (typeof vnode.type === "function") {
//        const Component = vnode.type as FunctionComponent;
//        const result = Component(vnode.props, { emit() {} });
//        if (result) render(result, container);
//        return;
//    }
//
//    // Handle Fragment
//    if (vnode.type === "Fragment") {
//        vnode.children.forEach((child) => render(child, container));
//        return;
//    }
//
//    // Create element (only for string types now)
//    if (typeof vnode.type === "string") {
//        const element = document.createElement(vnode.type);
//
//        // Apply props
//        if (vnode.props) {
//            Object.entries(vnode.props).forEach(([key, value]) => {
//                // Handle ref
//                if (key === "ref" && typeof value === "function") {
//                    value(element);
//                    return;
//                }
//
//                // Handle event listeners
//                if (key.startsWith("on") && typeof value === "function") {
//                    const eventType = key
//                        .slice(2)
//                        .toLowerCase() as keyof HTMLElementEventMap;
//                    element.addEventListener(eventType, value as EventListener);
//                    return;
//                }
//
//                // Handle style object
//                if (key === "style" && value && typeof value === "object") {
//                    Object.assign(element.style, value);
//                    return;
//                }
//
//                // Handle className
//                if (key === "className" && typeof value === "string") {
//                    element.className = value;
//                    return;
//                }
//
//                // Handle regular attributes
//                if (
//                    typeof value !== "function" &&
//                    typeof value !== "object" &&
//                    key !== "key"
//                ) {
//                    element.setAttribute(key, String(value));
//                }
//            });
//        }
//
//        // Render children
//        vnode.children.forEach((child) => render(child, element));
//        container.appendChild(element);
//    }
//}
