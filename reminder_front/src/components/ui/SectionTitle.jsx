function SectionTitle({ action, description, eyebrow, title }) {
  return (
    <div className="section-title">
      <div>
        {eyebrow ? <p className="section-title__eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="section-title__action">{action}</div> : null}
    </div>
  );
}

export default SectionTitle;
