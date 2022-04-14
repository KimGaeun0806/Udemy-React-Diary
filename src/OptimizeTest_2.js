import React, { useState, useEffect } from 'react';

const CounterA = React.memo(({ count }) => {
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  // props인 obj가 객체이기 때문에 React.memo를 사용해도 리렌더링이 일어남
  // js에서는 기본적으로 객체를 비교할 때 얕은 비교(주소에 의한 비교)를 하기 때문에 발생하는 문제
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true; // 이전 props와 현재 props가 같음 -> 리렌더링 x
  }
  return false; // 이전 props와 현재 props가 다름 -> 리렌더링 o

  // return prevProps.obj.count === nextProps.obj.count; 로 해도 괜찮음
}; // 비교함수로 사용됨 (깊은 비교)

const MemoizedCounterB = React.memo(CounterB, areEqual);
// CounterB는 areEqual 함수의 판단에 따라 리렌더링을 할지 말지 결정됨

const OptimizeTest_2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest_2;
