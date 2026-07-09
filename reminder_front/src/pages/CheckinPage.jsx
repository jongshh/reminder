import CheckinForm from "../components/checkin/CheckinForm";
import DifficultySuggestionCard from "../components/coach/DifficultySuggestionCard";
import SectionTitle from "../components/ui/SectionTitle";

function CheckinPage() {
  return (
    <div className="page">
      <SectionTitle
        description="30초 입력"
        eyebrow="AM / PM Check-in"
        title="체크"
      />
      <div className="checkin-layout">
        <CheckinForm />
        <DifficultySuggestionCard />
      </div>
    </div>
  );
}

export default CheckinPage;
