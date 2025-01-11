declare const Fragment: unique symbol;
type DOMEventHandler<K extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[K]) => void;
type StyleValue = string | Partial<CSSStyleDeclaration> | null;
type ClassValue = string | Record<string, boolean> | (string | Record<string, boolean>)[] | null;
type RefCallback<T> = (el: T | null) => void;
type RefObject<T> = {
    value: T | null;
};
type Ref<T = any> = RefCallback<T> | RefObject<T> | string;
type HTMLProps<T extends keyof HTMLElementTagNameMap> = Partial<{
    [K in keyof HTMLElementTagNameMap[T]]: HTMLElementTagNameMap[T][K];
}>;
type EmitsOptions = Record<string, ((...args: any[]) => any) | null>;
interface ComponentContext<E extends EmitsOptions = {}> {
    emit: E extends Record<infer K, any> ? (event: K, ...args: any[]) => void : (event: string, ...args: any[]) => void;
}
type FunctionComponent<P extends VNodeProps = VNodeProps, E extends EmitsOptions = {}> = (props: P, context: ComponentContext<E>) => VNode | null | undefined;
type EventHandlers = {
    [K in keyof HTMLElementEventMap as `on${Capitalize<K>}`]?: DOMEventHandler<K>;
};
type VNodeTypes = keyof HTMLElementTagNameMap | FunctionComponent | typeof Fragment;
type VNodeChild = VNode | string | number | boolean | null | undefined | FunctionComponent | VNodeChild[] | typeof Fragment;
interface VNodeProps extends EventHandlers, Record<string, unknown> {
    className?: string;
    style?: StyleValue;
    class?: ClassValue;
    key?: string | number;
    ref?: Ref;
    children?: VNodeChild | VNodeChild[];
}
interface VNode<P extends VNodeProps = VNodeProps> {
    type: VNodeTypes;
    props: P;
    children: VNodeChild[];
    el?: Node | null;
    key?: string | number | null | undefined;
}

export { type ClassValue, type ComponentContext, type DOMEventHandler, type EmitsOptions, type EventHandlers, Fragment, type FunctionComponent, type HTMLProps, type Ref, type RefCallback, type RefObject, type StyleValue, type VNode, type VNodeChild, type VNodeProps, type VNodeTypes };
