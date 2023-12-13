import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import PestControlIcon from "../ui/icons/Logo_Pest_Control";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <PestControlIcon size={110} fill="var(--primary)" />
      <LoginForm/>
    </div>
  );
};

export default LoginPage;