import React from "react";

import styles from "./Board.module.css";
import Card from "../Card/Card";

const Board = ({addButton}) => {
  return (
    <div className={styles.board}>
      <div className={styles.board_top}>
        <p className={styles.board_top_title}>To Do</p>
        <div className={styles.board_top_icons}>
          {addButton && (
            <button className={styles.add_btn}>
              <img src="/icons/plus-icon.svg" alt="plus-icon" />
            </button>
          )}
          <button className={styles.collapse_all_btn}>
            <img src="/icons/collapse.svg" alt="collapse-icon" />
          </button>
        </div>
      </div>
      <div className={`${styles.board_cards} ${styles.custom_scroll}`}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Board;
