import React from "react";

import styles from "./HomeMenuBtn.module.css"

const HomeMenuBtn = ({ label, icon, alt }) => {
  return (
    <div>
      <button className={styles.btn}>
        <span><img src={icon} alt={alt} /></span>
        <span>{label}</span>
      </button>
    </div>
  );
};

export default HomeMenuBtn;
