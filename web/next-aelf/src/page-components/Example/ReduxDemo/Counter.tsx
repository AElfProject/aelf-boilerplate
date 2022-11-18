import React from 'react';
import { Card, Button } from 'antd';
import type { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../../redux/features/counter/counterSlice';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Card title="RTK Demo" bordered={false}>
      <div>
        <div>
          <div>{count}</div>
          <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
            Increment
          </Button>
          <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
        </div>
      </div>
    </Card>
  );
}
