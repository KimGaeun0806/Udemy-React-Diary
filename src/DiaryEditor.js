import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryEditor = (
  {
    /* onCreate */
  }
) => {
  const { onCreate } = useContext(DiaryDispatchContext); // 비구조화 할당으로 받아오기

  const authorInput = useRef(); // html DOM 요소에 접근할 수 있음
  const contentInput = useRef();

  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });
  // state는 setState를 통해서만 변경될 수 있음

  // const [author, setAuthor] = useState('');
  // const [content, setContent] = useState(''); 를 묶어서 표현하는 방법

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // <input />, <textarea />에 있는 onChange들을 한 번에 묶어서 처리하는 방법
  // [e.target.name]: e.target.value는 author: e.target.value처럼 적용됨

  // onChange={(e) => {
  //   setState({ ...state, author: e.target.authort });
  // }}
  // onChange는 값이 바뀌었을 때 수행하는 이벤트. input의 값이 변경될 때마다 onChage에 전달한 콜백함수를 실행.
  // input에 값을 입력할 때마다 setAuthor를 이용하여 author의 값을 e.target.value로 변경

  // onChange={(e) => {
  //   setState({ ...state, content: e.target.value });
  // }}
  // state를 변경할 때는 setState에 변경할 값을 전달하기 때문에, 객체의 값을 바꾸려면 새로운 객체를 만들어서 전달해줘야 함
  // author: state.author처럼 변경하지 않는 것들을 모두 나열하는 대신, ...state 사용
  // ...state와 content: e.target.value의 순서를 바꾸면 x

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      // DOM 요소를 선택하는 useRef라는 기능으로 생성한 ref 객체는, 현재 가리키는 값을 current라는 프로퍼티로 불러와서 사용할 수 있음
      return; // handleSubmit 함수를 리턴시켜서 더이상 진행되지 않도록 함
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert('저장 성공');

    setState({
      author: '',
      content: '',
      emotion: 1,
    }); // 저장 후 입력폼 초기화하기
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>

      {/* 작성자 */}
      <div>
        <input
          ref={authorInput} // authorInput 이라는 ref 객체를 통해서 input 태그에 접근할 수 있음
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>

      {/* 본문 */}
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>

      {/* 감정 점수 */}
      <div>
        <span>오늘의 감정 점수: </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      {/* 저장 버튼 */}
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
// React.memo(DiaryEditor) -> React.memo로 컴포넌트를 감싼 것과 같은 효과
