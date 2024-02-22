import React, { useRef, useState } from "react";
import { format } from "date-fns";

import styles from "./Card.module.css";

const Card = ({ card, onMoveCard }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const menus = ["Edit", "Share", "Delete"];
  const dueDate = new Date(card.dueDate);
  const formattedDate = format(dueDate, "MMM do");
  const btnRef = useRef();
  const menuRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== btnRef.current) {
      setOpen(false);
    }
  });

  const handleCollapse = () => {
    setShow(!show);
  };

  const handleMoveCard = (targetBoardId) => {
    onMoveCard(card._id, targetBoardId)
  }
  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <div className={styles.card_label}>
          <span>{card.priority} PRIORITY</span>
        </div>
        <div className={styles.card_more_options}>
          <button
            ref={btnRef}
            className={styles.more_options}
            onClick={() => setOpen(!open)}
          >
            <img src="/icons/more-options.svg" alt="more-options" />
          </button>
          {open && (
            <div ref={menuRef} className={styles.card_menu_options}>
              {menus.map((menu) => (
                <span onClick={() => setOpen(false)} key={menu}>
                  {menu}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.card_title}>
        <span>{card.title}</span>
      </div>
      <div className={styles.card_checklist}>
        <div className={styles.task_count}>
          <span>Checklist</span>
          <span>(0/3)</span>
        </div>
        <button className={styles.collapse_down} onClick={handleCollapse}>
          {show ? (
            <img src="/icons/arrow-up.svg" alt="arrow-up" />
          ) : (
            <img src="/icons/arrow-down.svg" alt="arrow-down-icon" />
          )}
        </button>
      </div>
      {show && (
        <div className={styles.tasklist}>
          {card &&
            card.tasklist.map((task) => <div key={task._id}>{task.value}</div>)}
        </div>
      )}
      <div className={styles.footer}>
        {card.dueDate && (
          <div className={styles.due_date}>
            <span>{formattedDate}</span>
          </div>
        )}
        <div className={styles.board_btns}>
          <button onClick={() => handleMoveCard(1)}>BACKLOG</button>
          <button onClick={() => handleMoveCard(2)}>TO-DO</button>
          <button>DONE</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
