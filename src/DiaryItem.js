const DiaryItem = ({ author, content, created_date, emotion, id }) => {
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
    </div>
  );
};

export default DiaryItem;
