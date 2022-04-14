import React, { useState, useEffect } from 'react';

// React.memo를 이용하여 컴포넌트 재사용
// 즉 동일한 props로 동일한 결과를 렌더링한다면, 컴포넌트를 다시 렌더링하지 않고 마지막으로 렌더링된 결과 재사용

const TextView = React.memo(({ text }) => {
  return <div>{text}</div>;
}); // React.memo로 감싸주면, props인 text가 바뀌지 않으면 TextView는 리렌더링되지 않음

const CountView = React.memo(({ count }) => {
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
