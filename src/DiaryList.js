import DiaryItem from './DiaryItem';

const DiaryList = ({ onDelete, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onDelete={onDelete} />
          // it에 포함된 모든 데이터가 DiaryItem에게 props로 전달됨
          // it.id 대신 index값을 넣어도 되지만, 고유한 id로 key를 지정하는 것이 더 나음
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [], // diaryList 기본값 빈 배열로 설정
};

export default DiaryList;
