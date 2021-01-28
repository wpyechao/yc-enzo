import { MiddleModel, Namespace } from "./types";
export declare function createModel<S, A extends string>(namespace: Namespace, model: MiddleModel<S, A>): void;
export declare function getMiddleModel<S, A extends string>(namespace: Namespace): MiddleModel<S, A>;
export declare function getNamespaces(): string[];
