function Tag({ children, className = "", tone = "neutral" }) {
  return <span className={`tag tag--${tone} ${className}`.trim()}>{children}</span>;
}

export default Tag;
