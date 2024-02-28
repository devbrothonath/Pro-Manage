import React from "react";
import { Link } from "react-router-dom";

// components
import HomeMenuBtn from "../HomeMenuBtn/HomeMenuBtn.jsx";
import useLogout from "../../hooks/useLogout.jsx";

// styles
import styles from "./HomeMenu.module.css";

const HomeMenu = ({ handleButtonClick }) => {
  const { logout } = useLogout();
  const buttonProps = [
    { label: "Board", icon: "/icons/board.svg", alt: "board-icon" },
    { label: "Analytics", icon: "/icons/analytics.svg", alt: "analytics-icon" },
    { label: "Settings", icon: "/icons/settings.svg", alt: "settings-icon" },
  ];

  const handleLogout = () => {
    logout();
  };
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
            <HomeMenuBtn
              key={index}
              {...buttonProps}
              handleButtonClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          <Link to="/login">
            <button className={styles.logoutBtn} onClick={handleLogout}>
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
