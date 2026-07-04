function Card({ as: Component = "article", children, className = "", tone = "default", ...props }) {
  return (
    <Component className={`card card--${tone} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export default Card;
