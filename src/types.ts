export type Dispatch<S> = (payload: Partial<S> | ((oldState: S) => Partial<S>)) => void

export type SetState = () => {}

export type GetState<S, A extends string> = (namespace: Namespace) => Model<S, A>

export type Subscriber = { deps: Namespace[] | undefined, update: () => void }

export type Actions<S, A extends string> = {
  [key in A]: (state: S, options: { get: GetState<S, A>, dispatch: Dispatch<S> }) => Promise<any> | void
}

export type Model<S, A extends string> = {
  state: S,
  actions: {
    [key in A]: (state: S, options: { getState: GetState<S, A>, dispatch: Dispatch<S> }) => Promise<any> | void
  }
}

export type FlatModel<S, A extends string> = S & {
  [key in A]: () => void
}

export type Namespace = string