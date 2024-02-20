import React, { useEffect, useState } from "react";

import styles from "./BoardSection.module.css";
import Board from "../Boards/Board.jsx";

const BoardSection = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/api/tasks");
      const json = await response.json();

      if (response.ok) {
        setTasks(json);
      }
    };

    fetchTasks();
  }, []);
  // console.log(tasks)

  const boards = [
    {
      id: 1,
      boardTitle: "Backlog",
      cards: tasks
    },
    {
      id: 2,
      boardTitle: "To do",
      cards: tasks
    }
  ]

  // const [allBoards, setAllBoards] = useState(boards)
  // console.log(allBoards)
  // const addCard = () => {
  //   const card = {
  //   }
  // }
  const removeCard = (cardIndex, boardIndex) => {
    const bIndex = boards.findIndex((item) => item.id === boardIndex);
    if(bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cardIndex);
    if(cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards.splice(cIndex,1)
  }
  return (
    <div className={styles.boardSection}>
      <div className={styles.welcome_date}>
        <div className={styles.welcome_span}>
          <span>Welcome! Dev</span>
        </div>
        <div className={styles.date_span}>
          <span>18th Feb, 2024</span>
        </div>
      </div>
      <div className={styles.board_weekFilter}>
        <div className={styles.board_span}>
          <span>Board</span>
        </div>
        <div className={styles.week_filter}>
          <span>This week</span>
          <img src="/icons/dropdown.svg" alt="dropdown" />
        </div>
      </div>
      <div className={`${styles.boardsContainer} ${styles.custom_scroll}`}>
        <div className={styles.boards}>
          {boards.map((board) => <Board
            key={board.id}
            board={board}
            addButton={board.id === 2}
          />)}
          {/* {[1,2,3,4].map((index) => (
            <Board key={index} addButton={index === 2} />
          ))} */}
          {/* <Board />
          <Board />
          <Board />
          <Board /> */}
        </div>
      </div>
    </div>
  );
};

export default BoardSection;
