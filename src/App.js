import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';

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

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime(); // 시간 객체 생성 (new Date에 아무것도 넣지 않으면 현재 시간 기준으로 생성됨). getTime()을 사용해서 시간을 ms로 표현.
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]); // 새로운 일기에 기존 일기를 이어 붙인 효과
  }; // 일기 배열에 새로운 일기를 추가하는 함수

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
    // targetId가 id인 것만 제거한 새로운 배열을 만든 후 data를 변경
  }; // 일기를 삭제하는 함수

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      ) // id가 targetId인 것의 content를 newContent로 변경
    );
  }; // 일기를 수정하는 함수

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      {/* diaryList라는 이름으로 DiaryList 컴포넌트에서 props를 받을 수 있음  */}
    </div>
  );
}

export default App;
