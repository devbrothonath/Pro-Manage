import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";

import copy from "clipboard-copy";
import useTasksContext from "../../hooks/useTasksContext.jsx";

import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ card, onMoveCard, isInBoard }) => {
  const { dispatch } = useTasksContext();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const menus = ["Edit", "Share", "Delete"];
  const dueDate = new Date(card.dueDate);
  const formattedDate = format(dueDate, "MMM do");
  const btnRef = useRef();
  const menuRef = useRef();

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "/icons/redCircle.svg";
      case "moderate":
        return "/icons/blueCircle.svg";
      case "low":
        return "/icons/greenCircle.svg";
      default:
        return "";
    }
  };

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== btnRef.current) {
      setOpen(false);
    }
  });

  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:5000/api/tasks/" + card._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  const handleShare = async () => {
    console.log(card._id);
    await copy(`http://localhost:5173/card/${card._id}`);
    setLinkCopied(true);
    toast("Link copied to clipboard");
  };

  const handleCollapse = () => {
    setShow(!show);
  };

  const completedTasksCount = card.tasklist.filter(
    (task) => task.isCompleted
  ).length;
  // setCompletedTasks(completedTasksCount);

  const handleMoveCard = (targetBoardId) => {
    console.log(targetBoardId);
    onMoveCard(card._id, targetBoardId);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <div className={styles.card_label}>
          <img
            src={getPriorityIcon(card.priority)}
            alt={`${card.priority} priority icon`}
          />
          <span>{card.priority} priority</span>
        </div>
        <div className={styles.card_more_options}>
          <img
            ref={btnRef}
            onClick={() => setOpen(!open)}
            src="/icons/more-options.svg"
            alt="more-options"
          />
          {/* <button className={styles.more_options}>
          </button> */}
          {open && (
            <div ref={menuRef} className={styles.card_menu_options}>
              <Link
                to={`/card/edit/${card._id}`}
                target="_self"
                className={styles.edit_btn}
              >
                <span>Edit</span>
              </Link>
              <span onClick={handleShare}>Share</span>
              <span onClick={handleDelete}>Delete</span>
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
          <span>
            ({completedTasksCount}/{card.tasklist.length})
          </span>
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
            card.tasklist.map((task) => (
              <div key={task._id} className={styles.tasklist_task}>
                <input
                  type="checkbox"
                  // name={`completed${taskIndex}`}
                  defaultChecked={task.isCompleted}
                  // disabled
                  // onChange={(e) => handleInputChange(e, taskIndex)}
                />
                <span>{task.value}</span>
              </div>
            ))}
        </div>
      )}
      <div className={styles.footer}>
        {card.dueDate && (
          <div className={styles.due_date}>
            <span>{formattedDate}</span>
          </div>
        )}
        <div className={styles.board_btns}>
          {!isInBoard(card._id, 1) && (
            <button onClick={() => handleMoveCard(1)}>BACKLOG</button>
          )}
          {!isInBoard(card._id, 2) && (
            <button onClick={() => handleMoveCard(2)}>TO-DO</button>
          )}
          {!isInBoard(card._id, 3) && (
            <button onClick={() => handleMoveCard(3)}>PROGRESS</button>
          )}
          {!isInBoard(card._id, 4) && (
            <button onClick={() => handleMoveCard(4)}>DONE</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
