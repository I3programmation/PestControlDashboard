"use client";

import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";

import styles from "@/app/ui/login/login.module.css";

import LoginForm from "../ui/login/loginForm/loginForm";
import PestControlIcon from "../ui/icons/Logo_Pest_Control";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const user = sessionStorage.getItem("user");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        sessionStorage.setItem("user", JSON.stringify(res.user));
        router.push("/dashboard");
      } else {
        setErrorMsg("Authentification failed !");
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, router, loading]);

  return (
    <div className={styles.container}>
      <PestControlIcon size={110} fill="var(--primary)" />
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        errorMsg={errorMsg}
      />
      {/* <h5>{email}</h5>
      <h5>{password}</h5> */}
    </div>
  );
};

export default LoginPage;
