import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import styles from "./Login.module.css";

const Login = () => {
  // const {dispatch} = useLogin()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [passwordType, setPasswordType] = useState(false)

  const handlePassword = () => {
    setPasswordType(passwordType ? false : true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <div className={styles.login}>
      <div className={styles.login_logoBox}>
        <div className={styles.login_logoBox_logo}>
          <img src="/icons/astro.svg" alt="astro-icon" />
          <span>Welcome aboard my friend</span>
          <span>just a couple of clicks and we start</span>
        </div>
      </div>
      <div className={styles.login_formBox}>
        <div className={styles.login_formBox_form}>
          <div className={styles.login_formBox_form_title}>
            <span>Login</span>
          </div>
          <div className={styles.login_formBox_form_inputs}>
            <div>
              <img src="/icons/mail.svg" alt="mail-icon" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <img src="/icons/lock.svg" alt="lock-icon" />
              <input
                type={passwordType ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <img onClick={handlePassword} src="/icons/eye.svg" alt="eye-icon" />
            </div>
          </div>
          <div className={styles.login_formBox_form_submit}>
            <button onClick={handleSubmit} disabled={isLoading}>Log in</button>
          </div>
          <div className={styles.login_formBox_form_login}>
            <span>Have no account yet?</span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
