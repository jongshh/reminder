import Button from "../ui/Button";

function QuestCompleteButton({ completed, onToggle }) {
  return (
    <Button onClick={onToggle} size="sm" variant={completed ? "secondary" : "primary"}>
      {completed ? "완료됨" : "완료"}
    </Button>
  );
}

export default QuestCompleteButton;
