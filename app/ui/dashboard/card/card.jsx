import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({title, number, detail}) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={25} />
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{number}</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> {detail}
        </span>
      </div>
    </div>
  );
};

export default Card;
