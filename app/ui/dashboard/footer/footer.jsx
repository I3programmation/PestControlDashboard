import PestControlIcon from "../../icons/Logo_Pest_Control";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
      <PestControlIcon size={25} fill="var(--textSoft)" />
        PestControl
    </div>
      <div className={styles.text}>© All rights reserved.</div>
    </div>
  );
};

export default Footer;