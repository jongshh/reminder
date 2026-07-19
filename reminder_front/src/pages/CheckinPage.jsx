import CheckinForm from "../components/checkin/CheckinForm";
import DifficultySuggestionCard from "../components/coach/DifficultySuggestionCard";
import SectionTitle from "../components/ui/SectionTitle";

function CheckinPage() {
  return (
    <div className="page">
      <SectionTitle
        description="대답 하나면 충분해요. 저장 버튼 없이 바로 반영됩니다."
        eyebrow="ONE TAP CONDITION"
        title="오늘의 컨디션"
      />
      <div className="checkin-layout">
        <CheckinForm />
        <DifficultySuggestionCard />
      </div>
    </div>
  );
}

export default CheckinPage;
