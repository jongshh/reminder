import Tag from "../ui/Tag";

function FailureReasonTags({ onToggle, options, selected }) {
  return (
    <fieldset className="choice-group">
      <legend>막힌 이유</legend>
      <div className="tag-picker">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              aria-pressed={isSelected}
              className="tag-picker__button"
              key={option}
              onClick={() => onToggle(option)}
              type="button"
            >
              <Tag tone={isSelected ? "recovery" : "neutral"}>{option}</Tag>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default FailureReasonTags;
