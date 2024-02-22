import React, { useState } from "react";

import styles from "./Board.module.css";
import Card from "../Card/Card";
import TaskForm from "../TaskForm/TaskForm";

const Board = ({ addButton, board, onMoveCard }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.board}>
      <div className={styles.board_top}>
        <p className={styles.board_top_title}>{board.boardTitle}</p>
        <div className={styles.board_top_icons}>
          {addButton && (
            <button
              className={styles.add_btn}
              onClick={() => setShowModal(true)}
            >
              <img src="/icons/plus-icon.svg" alt="plus-icon" />
            </button>
          )}
          {showModal && <TaskForm onClose={() => setShowModal(false)} />}
          <button className={styles.collapse_all_btn}>
            <img src="/icons/collapse.svg" alt="collapse-icon" />
          </button>
        </div>
      </div>
      <div className={`${styles.board_cards} ${styles.custom_scroll}`}>
        {board.cards &&
          board.cards.map((card) => (
            <Card key={card._id} card={card} onMoveCard={onMoveCard} />
          ))}
      </div>
    </div>
  );
};

export default Board;
