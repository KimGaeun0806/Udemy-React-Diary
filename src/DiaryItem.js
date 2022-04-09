const DiaryItem = ({
  onDelete,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
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
      <div className="content">{content}</div>
      <button
        onClick={() => {
          console.log(id);
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id); // 확인 버튼을 눌렀을 때
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DiaryItem;
