import CheckinForm from "../components/checkin/CheckinForm";
import DifficultySuggestionCard from "../components/coach/DifficultySuggestionCard";
import SectionTitle from "../components/ui/SectionTitle";

function CheckinPage() {
  return (
    <div className="page">
      <SectionTitle
        description="AM은 오늘의 난이도를 잡고, PM은 실패 원인을 태그로 남겨 다음 루틴 조정에 씁니다."
        eyebrow="AM / PM Check-in"
        title="체크인"
      />
      <div className="checkin-layout">
        <CheckinForm />
        <DifficultySuggestionCard />
      </div>
    </div>
  );
}

export default CheckinPage;
