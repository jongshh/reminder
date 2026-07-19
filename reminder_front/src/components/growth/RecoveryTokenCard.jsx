import Card from "../ui/Card";
import Tag from "../ui/Tag";

function RecoveryTokenCard({ count, recoveryRate }) {
  return (
    <Card className="stat-card stat-card--recovery">
      <Tag tone="recovery">다시 시작권</Tag>
      <strong>{count}개</strong>
      <span>힘든 날 루틴을 자동으로 낮춰줘요</span>
      {typeof recoveryRate === "number" ? <small>돌아올 때마다 더 단단해지고 있어요</small> : null}
    </Card>
  );
}

export default RecoveryTokenCard;
