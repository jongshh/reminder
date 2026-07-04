import Card from "../ui/Card";
import Tag from "../ui/Tag";

function NextWeekSuggestion({ suggestion }) {
  return (
    <Card className="next-week-card">
      <Tag tone="recovery">다음 주 제안</Tag>
      <h3>{suggestion.title}</h3>
      <ul>
        {suggestion.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}

export default NextWeekSuggestion;
