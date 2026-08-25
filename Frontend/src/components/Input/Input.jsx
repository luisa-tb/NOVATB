import styles from "./Input.module.css";

export default function Input({ label, error, id, className = "", ...props }) {
  const inputId = id || props.name;
  return (
    <div className={`${styles.field} ${className}`}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <input id={inputId} className={styles.input} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}
