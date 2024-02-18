import React from "react";

import styles from "./HomeMenu.module.css"
import { Link } from "react-router-dom";
import HomeMenuBtn from "../HomeMenuBtn/HomeMenuBtn.jsx";

const HomeMenu = () => {
    const buttonProps = [
        {label:"Board", icon:"/icons/board.svg", alt:"board-icon"},
        {label:"Analytics", icon:"/icons/analytics.svg", alt:"analytics-icon"},
        {label:"Settings", icon:"/icons/settings.svg", alt:"settings-icon"}
    ]
  return (
    <div className={styles.menu}>
      <div>
        <div>
          <Link to="/" className={styles.logo}>
            <img src="/icons/codesandbox.svg" alt="logo" />
            <span>Pro Manage</span>
          </Link>
        </div>
        <div className={styles.menuBtns}>
          {buttonProps.map((buttonProps, index) => (
              <HomeMenuBtn key={index} {...buttonProps} />
          ))}
        </div>
      </div>
      <div>
        {/* <div>
          <Link>
            <button className={styles.menuBtn}>Login</button>
          </Link>
        </div> */}
        <div >
          <Link >
            <button className={styles.logoutBtn}>
              <img src="/icons/logout.svg" alt="logout" />
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
