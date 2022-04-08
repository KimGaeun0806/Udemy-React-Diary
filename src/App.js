import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const dummyList = [
    {
      id: 1,
      author: '김가은',
      content: '하이 1',
      emotion: '1',
      created_date: new Date().getTime(), // 시간 객체 생성 (new Date에 아무것도 넣지 않으면 현재 시간 기준으로 생성됨). getTime()을 사용해서 시간을 ms로 표현.
    },
    {
      id: 2,
      author: '김가은2',
      content: '하이 12',
      emotion: '1',
      created_date: new Date().getTime(),
    },
    {
      id: 3,
      author: '김가은3',
      content: '하이 123',
      emotion: '1',
      created_date: new Date().getTime(),
    },
  ];

  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
      {/* diaryList라는 이름으로 DiaryList 컴포넌트에서 props를 받을 수 있음  */}
    </div>
  );
}

export default App;
