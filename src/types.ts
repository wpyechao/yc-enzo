export type Dispatch<S> = (payload: Partial<S> | ((oldState: S) => Partial<S>)) => void

export type SetState = () => {}

export type GetState = <S, A extends string>(namespace: Namespace) => FlatModel<S, A>

export type Subscriber = { deps: Namespace[] | undefined, update: () => void }

export type Model<S, A extends string> = {
  state: S,
  actions: {
    [key in A]: (state: S, options: { getState: GetState, dispatch: Dispatch<S> }) => Promise<void> | void
  }
}

type Loading = Function & { loading: boolean }
export type FlatModel<S, A extends string> = S & {
  [key in A]: (() => void) & Loading
}

export type Namespace = string