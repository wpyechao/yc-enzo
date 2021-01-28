export declare type Dispatch<S> = (payload: Partial<S> | ((oldState: S) => Partial<S>)) => void;
export declare type SetState = () => {};
export declare type GetState<S, A extends string> = (namespace: Namespace) => Model<S, A>;
export declare type Subscriber = {
    deps: Namespace[] | undefined;
    update: () => void;
};
export declare type Actions<S, A extends string> = {
    [key in A]: (state: S, options: {
        get: GetState<S, A>;
        dispatch: Dispatch<S>;
    }) => Promise<any> | void;
};
export declare type MiddleModel<S, A extends string> = {
    state: S;
    actions: {
        [key in A]: (state: S, options: {
            getState: GetState<S, A>;
            dispatch: Dispatch<S>;
        }) => Promise<any> | void;
    };
};
export declare type Model<S, A extends string> = S & {
    [key in A]: () => void;
};
export declare type Namespace = string;
