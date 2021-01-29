import { createModel, useModel } from "yc-enzo"

export type State = {
  now: number,
}

export type Actions = 'updateFromModel' | 'updateFromComponent'

createModel<State, Actions>('time', {
  state: { 
    now: Date.now()
  },
  actions: {
    updateFromModel(_, { dispatch }) {
      dispatch({ now: Date.now() })
    },
    updateFromComponent: (_, { payload, dispatch }) => {
      dispatch({ now: payload })
    }
  }
})

export default () => {
  return useModel<State, Actions>('time')
}