export declare type Dispatch<S> = (payload: Partial<S> | ((oldState: S) => Partial<S>)) => void;
export declare type SetState = () => {};
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
        }) => Promise<void> | void;
    };
};
declare type Loading = Function & {
    loading: boolean;
};
export declare type FlatModel<S, A extends string> = S & {
    [key in A]: (() => void) & Loading;
};
export declare type Namespace = string;
export {};
