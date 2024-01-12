import { MdSupervisedUserCircle } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdRemove } from "react-icons/io";
import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={25} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>
          {item.number}
          {item.change > 0 ? (
            <IoMdArrowDropup size={30} color="green" />
          ) : item.change < 0 ? (
            <IoMdArrowDropdown size={30} color="red" />
          ) : (
            <IoMdRemove size={20} color="gray" />
          )}
        </span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : item.change < 0 ? styles.negative : styles.neutral}>
            {item.change !== 0 ? `${item.change}%` : "No Change"}
          </span>{" "}
          {item.change > 0 ? "more than previous week" : item.change < 0 ? "less than previous week" : ""}
        </span>
      </div>
    </div>
  );
};

export default Card;