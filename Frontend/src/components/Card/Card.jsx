import React, { useRef, useState } from "react";
import { format } from "date-fns";

import styles from "./Card.module.css";
import Dropdown from "../Dropdown/Dropdown";

const Card = ({ card }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const menus = ["Edit", "Share", "Delete"];
  //   const [showDropdown, setShowDropdown] = useState(false);
  //   console.log(showDropdown);
  const dueDate = new Date(card.dueDate);
  const formattedDate = format(dueDate, "MMM do");
  console.log(formattedDate);

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
  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <div className={styles.card_label}>
          <span>HIGH PRIORITY</span>
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
          {/* <Dropdown show={showDropdown} onClose={() => setShowDropdown(false)}>
            <div className={styles.card_dropdown}>
              <span>Delete</span>
            </div>
          </Dropdown> */}
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
          {/* <div>Task1</div>
          <div>Task2</div>
          <div>Task3</div>
          <div>Task4</div> */}
        </div>
      )}
      <div className={styles.footer}>
        {card.dueDate && (
          <div className={styles.due_date}>
            <span>{formattedDate}</span>
          </div>
        )}
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
