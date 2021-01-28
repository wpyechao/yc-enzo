import { createModel, useModel } from 'yc-enzo'
import * as React from 'react';

type State = {
  count: number,
}
type Actions = 'setCount'

createModel<State, Actions>('count', {
  state: { count: 0 },
  actions: {
    setCount: (state, { dispatch }) => {
      dispatch({ count: state.count + 1 })
    }
  }
})

const useCountModel = () => {
  return useModel<State, Actions>('count')
}


type State1 = {
  name: string,
}
type Actions1 = 'setName'
createModel<State1, Actions1>('name', {
  state: { name: '' },
  actions: {
    setName: (state, { getState, dispatch }) => {
      console.log(getState('count'))
      dispatch({ name: 'asd' })
    }
  }
})
const useNameModel = () => {
  return useModel<State1, Actions1>('name')
}



export default () => {
  const { count, setCount } = useCountModel()
  const { name, setName } = useNameModel()
  return (
    <div>
      <h1>{count}</h1>
      <h1>{name}</h1>
      <button onClick={() => setCount()}>++</button>
      <button onClick={() => setName()}>++</button>
    </div>
  )
}