function Button({
  children,
  className = "",
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
