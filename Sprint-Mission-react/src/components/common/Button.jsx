import styles from "./Button.module.css";

function Button({
  text,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
