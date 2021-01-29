export declare type Dispatch<S> = (payload: Partial<S> | ((oldState: S) => Partial<S>)) => void;
export declare type GetState = <S, A extends string>(namespace: Namespace) => FlatModel<S, A>;
export declare type Subscriber = {
    deps: Namespace[] | undefined;
    update: () => void;
};
export declare type Model<S, A extends string> = {
    state: S;
    actions: {
        [key in A]: (state: S, options: {
            getState: GetState;
            dispatch: Dispatch<S>;
            payload?: any;
        }) => Promise<void> | void;
    };
};
export interface LoadingFunction {
    (payload?: any): void;
    loading?: boolean;
}
export declare type FlatModel<S, A extends string> = S & {
    [key in A]: LoadingFunction;
};
export declare type Namespace = string;
