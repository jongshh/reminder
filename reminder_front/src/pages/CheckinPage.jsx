import CheckinForm from "../components/checkin/CheckinForm";
import DifficultySuggestionCard from "../components/coach/DifficultySuggestionCard";
import SectionTitle from "../components/ui/SectionTitle";

function CheckinPage() {
  return (
    <div className="page">
      <SectionTitle description="AM에는 계획을, PM에는 회고를 저장합니다." eyebrow="AM / PM Check-in" title="체크인" />
      <div className="checkin-layout">
        <CheckinForm />
        <DifficultySuggestionCard />
      </div>
    </div>
  );
}

export default CheckinPage;
