import { Model, Namespace } from "./types";
export declare function createModel<S, A extends string>(namespace: Namespace, model: Model<S, A>): void;
export declare function getMiddleModel<S, A extends string>(namespace: Namespace): Model<S, A>;
export declare function getNamespaces(): string[];
