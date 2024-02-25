import React from "react";

import styles from "./SettingsSection.module.css";

const SettingsSection = () => {
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
          <input type="text" placeholder="Old Password" />
          <img src="/icons/eye.svg" alt="eye-icon" />
        </div>
        <div>
          <img src="/icons/lock.svg" alt="lock-icon" />
          <input type="text" placeholder="New Password" />
          <img src="/icons/eye.svg" alt="eye-icon" />
        </div>
      </div>
      <div className={styles.settingsSection_update}>
        <button>Update</button>
      </div>
    </div>
  );
};

export default SettingsSection;
