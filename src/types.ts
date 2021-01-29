export type Dispatch<S> = (payload: Partial<S> | ((oldState: S) => Partial<S>)) => void

export type GetState = <S, A extends string>(namespace: Namespace) => FlatModel<S, A>

export type Subscriber = { deps: Namespace[] | undefined, update: () => void }

export type Model<S, A extends string> = {
  state: S,
  actions: {
    [key in A]: (state: S, options: { getState: GetState, dispatch: Dispatch<S>, payload?: any }) => Promise<void> | void
  }
}

export interface LoadingFunction {
  (payload?: any): void
  loading?: boolean
}
export type FlatModel<S, A extends string> = S & {
  [key in A]: LoadingFunction
}

export type Namespace = string