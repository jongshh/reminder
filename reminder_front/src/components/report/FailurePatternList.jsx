import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";

function FailurePatternList({ patterns }) {
  return (
    <section className="failure-patterns">
      <SectionTitle
        description="줄일 포인트"
        title="패턴"
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
