import { FiRefreshCw, FiShield, FiTruck } from "react-icons/fi";
import styles from "./TrustBar.module.css";

const items = [
  {
    icon: FiTruck,
    title: "Envíos rápidos",
    text: "Entrega ágil a todo el país",
  },
  {
    icon: FiShield,
    title: "Pagos seguros",
    text: "Protegemos cada transacción",
  },
  {
    icon: FiRefreshCw,
    title: "Devoluciones fáciles",
    text: "Proceso simple y transparente",
  },
];

export default function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Beneficios">
      <div className={`container ${styles.grid}`}>
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className={styles.item}>
            <Icon className={styles.icon} />
            <div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.text}>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
