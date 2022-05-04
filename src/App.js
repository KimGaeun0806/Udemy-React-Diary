import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';
import OptimizeTest from './OptimizeTest';
import OptimizeTest_2 from './OptimizeTest_2';

// https://jsonplaceholder.typicode.com/comments

// {
//   "postId": 1,
//   "id": 1,
//   "name": "id labore ex et quam laborum",
//   "email": "Eliseo@gardner.biz",
//   "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
// }, 형식

function App() {
  const [data, setData] = useState([]); // 데이터 (일기) 관리

  const dataId = useRef(0); // 일기별 id

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      // 데이터들 중에서 0부터 19 인덱스까지만 자름
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 0-4의 랜덤 난수 생성한 후 소수점을 버리고 + 1
        created_date: new Date().getTime(),
        id: dataId.current++, // id에 현재 값을 넣고 1을 더하기
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData(); // api 호출
  }, []); // 컴포넌트가 mount 되는 시점에 getData() 호출

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime(); // 시간 객체 생성 (new Date에 아무것도 넣지 않으면 현재 시간 기준으로 생성됨). getTime()을 사용해서 시간을 ms로 표현.
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;

    setData((data) => [newItem, ...data]);
    // 함수형 업데이트 (setData에 콜백 함수 전달)
    // useCallback의 두 번째 인수가 빈 배열이여도, 인수(data)를 통해서 항상 최신의 state를 참고할 수 있음

    // setData([newItem, ...data]); // 새로운 일기에 기존 일기를 이어 붙인 효과
    // useCallback의 두 번째 인수가 빈 배열일 때 이렇게 하면 최신의 데이터 state 값을 참고할 수 없기 때문에 이상하게 동작함
  }, []);
  // 일기 배열에 새로운 일기를 추가하는 함수
  // useCallback -> 값이 아니라 (메모이제이션된) 콜백함수를 반환함
  // 두 번째 인수로 전달한 값이 변하지 않으면 첫 번째 인수로 전달한 콜백함수를 계속 재사용
  // onCreate 함수가 계속 재생성되지 않게 막음
  // 두 번째 인수로 빈 배열을 전달해서, 마운트되는 시점에 한 번만 생성하고 그 다음부터는 재사용
  // useCallback을 사용하지 않았을 시에는, 일기를 삭제할 때마다 onCreate를 props로 받는 DiaryEditor 컴포넌트도 리렌더링됨

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
    // 아래 코드를 함수형 업데이트로 변경한 것
    // setData 함수에 전달되는 파라미터에 최신 state가 전달되는 것이기 때문에, 최신 state를 사용하기 위해서는 함수형 업데이트의 인수부분 데이터를 사용해야 함

    // const newDiaryList = data.filter((it) => it.id !== targetId);
    // setData(newDiaryList);
    // targetId가 id인 것만 제거한 새로운 배열을 만든 후 data를 변경
  }, []);
  // 일기를 삭제하는 함수
  // onRemove에 useCallback을 사용함으로써, DiaryItem에 onRemove가 props로 전달돼서 일기 하나만 삭제할 때도 일기들 모두가 리렌더링되던 것을 방지할 수 있음

  const onEdit = useCallback((targetId, newContent) => {
    setData(
      (data) =>
        data.map((it) =>
          it.id === targetId ? { ...it, content: newContent } : it
        ) // id가 targetId인 것의 content를 newContent로 변경
    );
  }, []);
  // 일기를 수정하는 함수
  // // onRemove에 useCallback을 사용함으로써, DiaryItem에 onRemove가 props로 전달돼서 일기 하나만 수정할 때도 일기들 모두가 리렌더링되던 것을 방지할 수 있음

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length; // 감정점수 3 이상인 일기의 개수
    const badCount = data.length - goodCount; // 감정점수 2 이하인 일기의 개수
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  // useMemo를 사용하지 않으면 state가 바뀌는 등의 이유로 컴포넌트가 리렌더링 될 때마다 getDiaryAnalysis 함수가 다시 호출됨 (useMemo로 연산 최적화)
  // 하지만 여기서 일기 데이터를 수정하는 등의 것들은 getDiaryAnalysis에 아무 영향도 미치지 않기에 낭비임
  // useMemo를 이용해 최적화. 첫 번째 인수로 콜백함수를 받아서, 콜백함수의 연산을 최적화. 두 번째 인수로 배열을 받는데, useEffect의 두 번째 인수와 기능이 비슷 (어떤 값이 변화할 때 연산을 수행하게 할 것인지 명시).
  // data.length가 변화할 때만 콜백함수가 다시 수행되어 연산함. data.length가 변화하지 않을 때는 getDiaryAnalysis을 호출해도 연산하지 않고 똑같은 리턴을 반환함.
  // useMemo를 사용하게 되면 getDiaryAnalysis는 콜백함수가 리턴하는 값을 리턴하기 때문에, 함수가 아닌 값이 되어버림. 그래서 getDiaryAnalysis()처럼 함수로 사용할 수 x. 값처럼 사용해야 함.

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 함수를 호출한 결과값을 객체 비구조화 할당으로 받음

  return (
    <div className="App">
      {/* <Lifecycle /> */}
      {/* <OptimizeTest /> */}
      {/* <OptimizeTest_2 /> */}

      <DiaryEditor onCreate={onCreate} />

      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>

      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      {/* diaryList라는 이름으로 DiaryList 컴포넌트에서 props를 받을 수 있음  */}
    </div>
  );
}

export default App;
