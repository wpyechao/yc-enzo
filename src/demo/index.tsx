import { createModel, useModel } from 'yc-enzo'
import * as React from 'react';
import { Button } from 'antd';

type State = {
  count: number,
}
type Actions = 'setCount'
createModel<State, Actions>('count', {
  state: { 
    count: 0 
  },
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
type Actions1 = 'setName' | 'setNameAndCount'
createModel<State1, Actions1>('name', {
  state: { name: '' },
  actions: {
    setName: (state, { dispatch }) => {
      console.log('prev state', state.name)
      dispatch({ name: 'random name' + Math.random().toFixed(3) })
    },
    setNameAndCount: (state, { dispatch, getState }) => {
      getState<State, Actions>('count').setCount()
      dispatch({ name: 'random name' + Math.random().toFixed(3) })
    }
  }
})
const useNameModel = () => {
  return useModel<State1, Actions1>('name')
}



export default () => {
  const { count, setCount } = useCountModel()
  const { name, setName, setNameAndCount } = useNameModel()
  return (
    <div>
      <h1>{count}</h1>
      <h1>{name}</h1>
      <Button onClick={() => setCount()}>++</Button>
      <Button onClick={() => setName()}>change name</Button>
      <Button onClick={() => setNameAndCount()}>change name and count</Button>
    </div>
  )
}