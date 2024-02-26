import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
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
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <img src="/icons/eye.svg" alt="eye-icon" />
            </div>

          </div>
            <div className={styles.login_formBox_form_submit}>
              <button onClick={handleSubmit}>Log in</button>
            </div>
          <div className={styles.login_formBox_form_login}>
            <span>Have no account yet?</span>
            <Link to="/register"><button>Register</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
