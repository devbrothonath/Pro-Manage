import React, { useState } from "react";

import styles from "./Card.module.css";

const Card = () => {
    const [show, setShow] = useState(false)

    const handleCollapse = () => {
        setShow(!show)
    }
  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <div className={styles.card_label}>
          <span>HIGH PRIORITY</span>
        </div>
        <button className={styles.more_options}>
          <img src="/icons/more-options.svg" alt="more-options" />
        </button>
      </div>
      <div className={styles.card_title}>
        <span>Hero Section</span>
      </div>
      <div className={styles.card_checklist}>
        <div className={styles.task_count}>
            <span>Checklist</span>
            <span>(0/3)</span>
        </div>
        <button className={styles.collapse_down} onClick={handleCollapse}>
          {show ? <img src="/icons/arrow-up.svg" alt="arrow-up" /> : <img src="/icons/arrow-down.svg" alt="arrow-down-icon" />}
        </button>
      </div>
      {show && <div className={styles.tasklist}>
        <div>Task1</div>
        <div>Task2</div>
        <div>Task3</div>
        <div>Task4</div>
      </div>}
      <div className={styles.footer}>
        <div className={styles.due_date}>
          <span>Feb 23rd</span>
        </div>
        <div className={styles.board_btns}>
          <button>PROGRESS</button>
          <button>TO-DO</button>
          <button>DONE</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
