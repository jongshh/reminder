import Card from "../ui/Card";
import Tag from "../ui/Tag";

function RecoveryTokenCard({ count, recoveryRate }) {
  return (
    <Card className="stat-card stat-card--recovery">
      <Tag tone="recovery">리커버리 토큰</Tag>
      <strong>{count}개</strong>
      <span>실패한 날의 난이도를 낮추고 루틴으로 돌아오는 장치입니다.</span>
      {typeof recoveryRate === "number" ? <small>48시간 내 복귀율 {recoveryRate}%</small> : null}
    </Card>
  );
}

export default RecoveryTokenCard;
