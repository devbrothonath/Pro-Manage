import React from "react";

// styles
import styles from "./HomeMenuBtn.module.css";

const HomeMenuBtn = ({ label, icon, alt, handleButtonClick }) => {
  return (
    <div>
      <button className={styles.btn} onClick={() => handleButtonClick(label)}>
        <span>
          <img src={icon} alt={alt} />
        </span>
        <span>{label}</span>
      </button>
    </div>
  );
};

export default HomeMenuBtn;
