export const Fragment = Symbol("Fragment");
// Dom Event Handler Type
export type DOMEventHandler<K extends keyof HTMLElementEventMap> = (
    event: HTMLElementEventMap[K],
) => void;
// Style type that can be string or class
export type StyleValue = string | Partial<CSSStyleDeclaration> | null;

// Class type that can be string object or array
export type ClassValue =
    | string
    | Record<string, boolean>
    | (string | Record<string, boolean>)[]
    | null;

// Ref type
export type RefCallback<T> = (el: T | null) => void;
export type RefObject<T> = { value: T | null };
export type Ref<T = any> = RefCallback<T> | RefObject<T> | string;

// Props for HTML elements
export type HTMLProps<T extends keyof HTMLElementTagNameMap> = Partial<{
    // DOM properties and attributes
    [K in keyof HTMLElementTagNameMap[T]]: HTMLElementTagNameMap[T][K];
}>;

// EmitsOptions for better type safety in events
export type EmitsOptions = Record<string, ((...args: any[]) => any) | null>;

// Context type with proper event emitter
export interface ComponentContext<E extends EmitsOptions = {}> {
    emit: E extends Record<infer K, any>
        ? (event: K, ...args: any[]) => void
        : (event: string, ...args: any[]) => void;
}

// Functional component with proper typing
export type FunctionComponent<
    P extends VNodeProps = VNodeProps,
    E extends EmitsOptions = {},
> = (props: P, context: ComponentContext<E>) => VNode | null | undefined;

// Event handle type
export type EventHandlers = {
    [K in keyof HTMLElementEventMap as `on${Capitalize<K>}`]?: DOMEventHandler<K>;
};

export type VNodeTypes =
    | keyof HTMLElementTagNameMap
    | FunctionComponent
    | typeof Fragment;

export type VNodeChild =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | FunctionComponent
    | VNodeChild[]
    | typeof Fragment;

export interface VNodeProps extends EventHandlers, Record<string, unknown> {
    className?: string;
    style?: StyleValue;
    class?: ClassValue;
    key?: string | number;
    ref?: Ref;
    children?: VNodeChild | VNodeChild[]; // Include children in props
}

export interface VNode<P extends VNodeProps = VNodeProps> {
    type: VNodeTypes;
    props: P;
    children: VNodeChild[];
    el?: Node | null;
    key?: string | number | null | undefined;
}
