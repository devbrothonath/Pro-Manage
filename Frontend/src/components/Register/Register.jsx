import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister.jsx"

import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {register, error, isLoading} = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(name, email, password, confirmPassword)
    console.log(name, email, password);
  };
  return (
    <div className={styles.register}>
      <div className={styles.register_logoBox}>
        <div className={styles.register_logoBox_logo}>
          <img src="/icons/astro.svg" alt="astro-icon" />
          <span>Welcome aboard my friend</span>
          <span>just a couple of clicks and we start</span>
        </div>
      </div>
      <div className={styles.register_formBox}>
        <div className={styles.register_formBox_form}>
          <div className={styles.register_formBox_form_title}>
            <span>Register</span>
          </div>
          <div className={styles.register_formBox_form_inputs}>
            <div>
              <img src="/icons/person.svg" alt="person-icon" />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
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
            <div>
              <img src="/icons/lock.svg" alt="lock-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <img src="/icons/eye.svg" alt="eye-icon" />
            </div>
          </div>
          <div className={styles.register_formBox_form_submit}>
            <button onClick={handleSubmit} disabled={isLoading}>Register</button>
          </div>
          <div className={styles.register_formBox_form_login}>
            <span>Have an account?</span>
            <Link to="/login">
              <button>Log in</button>
            </Link>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
