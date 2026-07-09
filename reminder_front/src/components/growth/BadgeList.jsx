import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";

function BadgeList({ badges }) {
  return (
    <section className="badge-section">
      <SectionTitle
        description="작은 성공"
        title="배지"
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
