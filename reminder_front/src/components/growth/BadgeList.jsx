import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";

function BadgeList({ badges }) {
  return (
    <section className="badge-section">
      <SectionTitle
        description="무거운 RPG 보상 대신 지속성을 떠올리게 하는 가벼운 성장 기록입니다."
        title="획득 배지"
      />
      <div className="badge-list">
        {badges.map((badge) => (
          <Tag key={badge.id} tone={badge.tone}>
            {badge.label}
          </Tag>
        ))}
      </div>
    </section>
  );
}

export default BadgeList;
