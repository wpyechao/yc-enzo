import { Namespace, Subscriber, FlatModel } from "./types";
/** 唯一的值 */
declare const symbol: unique symbol;
declare type ModelWithSymbol<S, A extends string> = FlatModel<S, A> & {
    [symbol]: Set<Subscriber>;
};
declare function useModel<S, A extends string>(namespace: Namespace, deps?: Namespace[]): ModelWithSymbol<S, A>;
export default useModel;
