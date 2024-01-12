"use client";

import styles from "./loginForm.module.css";

const LoginForm = ({email, password, errorMsg ,setEmail, setPassword, handleLogin}) => {

  return (
    <form className={styles.form}>
      <input type="email" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
      <span className={styles.errorMsg}>{errorMsg}</span>
    </form>
  );
};

export default LoginForm;