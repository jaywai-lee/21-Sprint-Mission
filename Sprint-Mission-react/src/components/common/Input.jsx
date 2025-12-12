import styles from "./Input.module.css";

function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}) {
  const inputClass =
    type === "textarea" ? `${styles.textarea}` : `${styles.input}`;

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className={inputClass}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          className={inputClass}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}

export default Input;
