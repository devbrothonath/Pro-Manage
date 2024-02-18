import React from "react";

import styles from "./HomeContent.module.css"
import BoardSection from "../BoardSection/BoardSection";

const HomeContent = () => {
  return (
    <div className={styles.content}>
      <BoardSection />
    </div>
  );
};

export default HomeContent;
