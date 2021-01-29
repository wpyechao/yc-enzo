import * as React from 'react';
import { Badge, Button, Divider, Space } from 'antd';
import useCountModel from './use-count-model';
import useTimeModel from './use-time-model';
import moment from 'moment'

const Count = () => {
  const { count } = useCountModel()
  return (
    <Badge count={count} overflowCount={999}>
      <div style={{height: 42, width: 42, borderRadius: 4, background: '#eee'}}></div>
    </Badge>
  )
}

const Time = () => {
  const { now } = useTimeModel()

  return (
    <h1 style={{marginTop: 24}}>
      现在时间——————{moment(now).format('YYYY-MM-DD HH:mm:ss')}
    </h1>
  )
}


export default () => {
  const { addCount, addCountAsync } = useCountModel()
  const { updateFromComponent, updateFromModel } = useTimeModel()
  return (
    <div>
      <Space>
        <Button onClick={() => addCount()}>count ++</Button>
        <Button loading={addCountAsync.loading} onClick={() => addCountAsync()}>async count ++</Button>
        <Button onClick={() => updateFromModel()}>updateFromModel</Button>
        <Button onClick={() => updateFromComponent(Date.now())}>updateFromComponent</Button>
      </Space>
      <Divider />
      <Count />
      <Time />
    </div>
  )
}
