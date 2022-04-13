import React, { useState, useEffect } from 'react';

// React Component Lifecycle
// Mount (화면에 나타나는 것) -> Update (업데이트 / 리렌더) -> Unmount (화면에서 사라짐)

const UnmountTest = () => {
  useEffect(() => {
    console.log('Mount'); // Mount 시점에 실행됨

    return () => {
      console.log('Unmount');
    }; // Unmount 시점에 실행됨
  }, []);

  return <div>Unmount Testing Component</div>;
}; // 자식 컴포넌트

const Lifecycle = () => {
  // Mount, Update
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Mount');
  }, []);
  // 두 번째 인수에 빈 배열을 전달 -> 컴포넌트가 mount된 시점에만 useEffect의 콜백함수가 실행됨
  // 새로고침할 때 'Mount' 출력

  useEffect(() => {
    console.log('Update');
  });
  // 두 번째 인수를 전달 x -> 컴포넌트가 업데이트되는 순간 (리렌더링되는 순간)에 useEffect의 콜백함수가 실행됨
  // state가 변경되거나, 부모에게서 받는 props가 변경되거나, 부모 컴퍼넌트가 리렌더링되는 등의 이유로 컴포넌트가 업데이트될 때 'Update' 출력

  useEffect(() => {
    console.log(`count is update: ${count}`);
    if (count > 5) {
      alert('count가 5를 넘었습니다. 1로 초기화합니다.');
      setCount(1);
    }
  }, [count]);
  // count state가 변화할 때마다 useEffect의 콜백함수가 실행됨

  useEffect(() => {
    console.log(`text is update: ${text}`);
  }, [text]);
  // count stste가 변화할 때마다 useEffect의 콜백함수가 실행됨

  // Unmount
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      {/* Mount, Update */}
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      {/* Unmount */}
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      {/* 단락회로평가. isVisible이 true면 UnMountTest가 화면에 렌더링됨. isVisible이 false면 단락회로평가가 일어나서 UnmountText가 렌더링되지 않음. */}
    </div>
  );
};

export default Lifecycle;
