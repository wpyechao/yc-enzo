import { createModel, useModel } from "yc-enzo"

const wait = async () => {
  return new Promise(r => setTimeout(r, 1000))
}

export type State = {
  count: number,
}

export type Actions = 'addCount' | 'addCountAsync'

createModel<State, Actions>('count', {
  state: { 
    count: 1
  },
  actions: {
    addCount: (state, { dispatch }) => {
      dispatch({ count: state.count + 1 })
    },
    async addCountAsync (state, { dispatch }) {
      await wait()
      dispatch({ count: state.count + 1 })
    }
  }
})

export default () => {
  return useModel<State, Actions>('count')
}