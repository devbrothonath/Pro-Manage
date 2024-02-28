import React from "react";

// components
import BoardSection from "../BoardSection/BoardSection";
import AnalyticsSection from "../AnalyticsSection/AnalyticsSection";
import SettingsSection from "../SettingsSection/SettingsSection";

// styles
import styles from "./HomeContent.module.css";

const HomeContent = ({ activeSection }) => {
  return (
    <div className={styles.content}>
      {activeSection === "Board" && <BoardSection />}
      {activeSection === "Analytics" && <AnalyticsSection />}
      {activeSection === "Settings" && <SettingsSection />}
    </div>
  );
};

export default HomeContent;
