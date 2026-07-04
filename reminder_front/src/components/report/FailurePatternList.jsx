import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";

function FailurePatternList({ patterns }) {
  return (
    <section className="failure-patterns">
      <SectionTitle
        description="자책용 통계가 아니라 다음 주 난이도를 낮추기 위한 조건 분석입니다."
        title="반복 실패 조건"
      />
      <div className="pattern-list">
        {patterns.map((pattern) => (
          <Card className="pattern-card" key={pattern.id}>
            <Tag tone="warning">{pattern.count}회</Tag>
            <h3>{pattern.label}</h3>
            <p>{pattern.note}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FailurePatternList;
