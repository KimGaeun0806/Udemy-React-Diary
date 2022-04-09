import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author: '김가은',
//     content: '하이 1',
//     emotion: '1',
//     created_date: new Date().getTime(), // 시간 객체 생성 (new Date에 아무것도 넣지 않으면 현재 시간 기준으로 생성됨). getTime()을 사용해서 시간을 ms로 표현.
//   },
//   {
//     id: 2,
//     author: '김가은2',
//     content: '하이 12',
//     emotion: '1',
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '김가은3',
//     content: '하이 123',
//     emotion: '1',
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]); // 데이터 (일기) 관리

  const dataId = useRef(0); // 일기별 id

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime(); // 현재 시간
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

  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
    // targetId가 id인 것만 제거한 새로운 배열을 만든 후 data를 변경
  }; // 일기를 삭제하는 함수

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
      {/* diaryList라는 이름으로 DiaryList 컴포넌트에서 props를 받을 수 있음  */}
    </div>
  );
}

export default App;
