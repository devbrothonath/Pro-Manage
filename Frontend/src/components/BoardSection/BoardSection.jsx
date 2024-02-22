import React, { useEffect, useState } from "react";

import styles from "./BoardSection.module.css";
import Board from "../Boards/Board.jsx";

const BoardSection = () => {
  const [tasks, setTasks] = useState(null);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const json = await response.json();

        if (response.ok) {
          setTasks(json);

          setBoards([
            {
              id: 1,
              boardTitle: "Backlog",
              cards: [],
            },
            {
              id: 2,
              boardTitle: "To do",
              cards: json,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);
  // console.log(tasks)

  // const moveCard = (cardId, targetBoardId) => {
  //   // Find the source board and card
  //   const sourceBoard = boards.find((board) =>
  //     board.cards.some((card) => card.id === cardId)
  //   );
  //   const sourceCardIndex = sourceBoard.cards.findIndex(
  //     (card) => card.id === cardId
  //   );
  //   const sourceCard = sourceBoard.cards[sourceCardIndex];

  //   // Remove the card from the source board
  //   const updatedSourceBoard = {
  //     ...sourceBoard,
  //     cards: [
  //       ...sourceBoard.cards.slice(0, sourceCardIndex),
  //       ...sourceBoard.cards.slice(sourceCardIndex + 1),
  //     ],
  //   };

  //   // Find the target board
  //   const targetBoard = boards.find((board) => board.id === targetBoardId);

  //   // Add the card to the target board
  //   const updatedTargetBoard = {
  //     ...targetBoard,
  //     cards: [...targetBoard.cards, sourceCard],
  //   };

  //   // Update the boards in the state
  //   setBoards((prevBoards) =>
  //     prevBoards.map((board) =>
  //       board.id === updatedSourceBoard.id
  //         ? updatedSourceBoard
  //         : board.id === updatedTargetBoard.id
  //         ? updatedTargetBoard
  //         : board
  //     )
  //   );
  // };

  const moveCard = (cardId, targetBoardId) => {
    const updatedBoards = boards.map((board) => {
      return {
        ...board,
        cards: board.cards.filter((card) => card._id !== cardId),
      };
    });

    const targetBoardIndex = updatedBoards.findIndex(
      (board) => board.id === targetBoardId
    );

    updatedBoards[targetBoardIndex].cards.push(
      tasks.find((task) => task._id === cardId)
    );

    setBoards(updatedBoards);
  };

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
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              onMoveCard={moveCard}
              addButton={board.id === 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardSection;
