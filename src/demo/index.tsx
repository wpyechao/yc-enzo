import { createModel, useModel } from 'yc-enzo'
import * as React from 'react';
import { Button } from 'antd';

const wait = async () => {
  return new Promise(r => setTimeout(r, 1000))
}

type State = {
  count: number,
}

type Actions = 'setCount' | 'setAsyncCount'
createModel<State, Actions>('count', {
  state: { 
    count: 0 
  },
  actions: {
    setCount: (state, { dispatch }) => {
      dispatch({ count: state.count + 1 })
    },
    async setAsyncCount (state, { dispatch }) {
      await wait()
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
  const { count, setCount, setAsyncCount } = useCountModel()
  const { name, setName, setNameAndCount } = useNameModel()
  return (
    <div>
      <h1>{count}</h1>
      <h1>{name}</h1>
      <Button onClick={() => setCount()}>++</Button>
      <Button loading={setAsyncCount.loading} onClick={() => setAsyncCount()}>async ++</Button>
      <Button onClick={() => setName()}>change name</Button>
      <Button onClick={() => setNameAndCount()}>change name and count</Button>
    </div>
  )
}
