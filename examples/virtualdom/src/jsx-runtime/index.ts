const createElement = (type: VNodeTypes, props: VNodeProps): VNode => {
    const { children, ...restProps } = props;
    // Normalizing children to always be an array
    const normalizedChildren = children
        ? Array.isArray(children)
            ? children
            : [children]
        : [];
    return {
        type,
        props: restProps || {},
        children: normalizedChildren,
    };
};

export const jsx = createElement;
export const jsxs = jsx;
export const Fragment = "Fragment";
