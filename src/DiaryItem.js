import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({
  /* onEdit, onRemove,*/
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false); // 수정중인지 아닌지를 boolean으로 값 보관
  const toggleIsEdit = () => setIsEdit(!isEdit); // 수정하기 눌렀을 때 // toggleIsEdit이 호출되면 원래 isEdit의 값을 반전시킴

  const [localContent, setLocalContent] = useState(content); // 수정 폼의 내용

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id); // 확인 버튼을 눌렀을 때
    }
  }; // 삭제하기 눌렀을 때

  const handleQuitEdit = () => {
    setIsEdit(false);
    localContent(content);
  }; // 수정 취소 눌렀을 때

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit(); // 수정 폼 닫기
    }
  }; // 수정 완료 눌렀을 때

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
        {/* created_date를 기준으로 Date 객체 생성. 그리고 toLocaleString()을 사용해서 알아보기 쉽게 변환 */}
      </div>

      <div className="content">
        {isEdit ? (
          // inEdit이 true일 때 (수정 중일 때)
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          // inEdit이 false일 때
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        // isEdit이 true일 때 (수정 중일 때 )
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        // inEdit이 false일 때
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
