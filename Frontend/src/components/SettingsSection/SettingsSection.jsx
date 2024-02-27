import React, { useState } from "react";

import styles from "./SettingsSection.module.css";

const SettingsSection = () => {
  const [passwordType, setPasswordType] = useState(false)
  const [newPasswordType, setConfirmPasswordType] = useState(false)

  const handlePasswordType = () => {
    setPasswordType(passwordType ? false : true)
  }

  const handleNewPasswordType = () => {
    setConfirmPasswordType(newPasswordType ? false : true)
  }

  const handleUpdate = () => {
    alert("This feature is under development")
  }
  return (
    <div className={styles.settingsSection}>
      <div className={styles.settingsSection_title}>
        <span>Settings</span>
      </div>
      <div className={styles.settingsSection_inputs}>
        <div>
          <img src="/icons/person.svg" alt="person-icon" />
          <input type="text" placeholder="Name" />
        </div>
        <div>
          <img src="/icons/lock.svg" alt="lock-icon" />
          <input type={passwordType ? "text" : "password"} placeholder="Old Password" />
          <img onClick={handlePasswordType} src="/icons/eye.svg" alt="eye-icon" />
        </div>
        <div>
          <img src="/icons/lock.svg" alt="lock-icon" />
          <input type={newPasswordType ? "text" : "password"} placeholder="New Password" />
          <img onClick={handleNewPasswordType} src="/icons/eye.svg" alt="eye-icon" />
        </div>
      </div>
      <div className={styles.settingsSection_update}>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default SettingsSection;
