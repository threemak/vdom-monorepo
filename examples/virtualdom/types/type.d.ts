declare global {
    const Fragment = "Fragment";
    // Dom Event Handler Type
    type DOMEventHandler<K extends keyof HTMLElementEventMap> = (
        event: HTMLElementEventMap[K],
    ) => void;
    // Style type that can be string or class
    type StyleValue = string | Partial<CSSStyleDeclaration> | null;

    // Class type that can be string object or array
    type ClassValue =
        | string
        | Record<string, boolean>
        | (string | Record<string, boolean>)[]
        | null;

    // Ref type
    type RefCallback<T> = (el: T | null) => void;
    type RefObject<T> = { value: T | null };
    type Ref<T = any> = RefCallback<T> | RefObject<T> | string;

    // Props for HTML elements
    type HTMLProps<T extends keyof HTMLElementTagNameMap> = Partial<{
        // DOM properties and attributes
        [K in keyof HTMLElementTagNameMap[T]]: HTMLElementTagNameMap[T][K];
    }>;

    // EmitsOptions for better type safety in events
    type EmitsOptions = Record<string, ((...args: any[]) => any) | null>;

    // Context type with proper event emitter
    interface ComponentContext<E extends EmitsOptions = {}> {
        emit: E extends Record<infer K, any>
            ? (event: K, ...args: any[]) => void
            : (event: string, ...args: any[]) => void;
    }

    // Functional component with proper typing
    type FunctionComponent<
        P extends VNodeProps = VNodeProps,
        E extends EmitsOptions = {},
    > = (props: P, context: ComponentContext<E>) => VNode | null | undefined;

    // Event handle type
    type EventHandlers = {
        [K in keyof HTMLElementEventMap as `on${Capitalize<K>}`]?: DOMEventHandler<K>;
    };

    type VNodeTypes =
        | keyof HTMLElementTagNameMap
        | FunctionComponent
        | typeof Fragment;

    type Primitive = string | number | boolean | null | undefined;

    type VNodeChild =
        | VNode
        | Primitive
        | FunctionComponent
        | VNodeChild[]
        | typeof Fragment;

    interface VNodeProps extends EventHandlers, Record<string, unknown> {
        className?: string;
        style?: StyleValue;
        class?: ClassValue;
        key?: string | number;
        ref?: Ref;
        children?: VNodeChild | VNodeChild[]; // Include children in props
    }

    interface VNode<P extends VNodeProps = VNodeProps> {
        type: VNodeTypes;
        props: P;
        children: VNodeChild[];
        el?: Node | null;
        key?: string | number | null | undefined;
    }
}

export {};
