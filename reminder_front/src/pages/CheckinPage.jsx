import CheckinForm from "../components/checkin/CheckinForm";
import DifficultySuggestionCard from "../components/coach/DifficultySuggestionCard";
import SectionTitle from "../components/ui/SectionTitle";

function CheckinPage() {
  return (
    <div className="page">
      <SectionTitle
        description="한 번만 눌러도 저장되고, 원하면 AM·PM 상세 기록도 남길 수 있어요."
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
