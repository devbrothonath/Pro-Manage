import React from "react";

import styles from "./HomeContent.module.css";
import BoardSection from "../BoardSection/BoardSection";
import AnalyticsSection from "../AnalyticsSection/AnalyticsSection";
import SettingsSection from "../SettingsSection/SettingsSection";

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
