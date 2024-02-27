import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";

import styles from "./BoardSection.module.css";
import Board from "../Boards/Board.jsx";
import useTasksContext from "../../hooks/useTasksContext.jsx";
import useAuthContext from "../../hooks/useAuthContext.jsx";

const BoardSection = () => {
  const { user } = useAuthContext();
  const { tasks, dispatch } = useTasksContext();
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const userName = userObject && userObject.name;
  const { contextBoards } = useTasksContext([]);
  const [boards, setBoards] = useState([]);
  const today = new Date();
  const formattedDate = format(today, "do MMM, yyyy");
  const [open, setOpen] = useState(false);
  const btnRef = useRef();
  const menuRef = useRef();
  // console.log(formattedDate)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_TASKS", payload: json });
          // setTasks(json);

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
            {
              id: 3,
              boardTitle: "Progress",
              cards: [],
            },
            {
              id: 4,
              boardTitle: "Done",
              cards: [],
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  const moveCard = async (cardId, targetBoardId) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks/moveCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ cardId, targetBoardId }),
      });

      if (response.ok) {
        // Fetch the updated data from the server
        const updatedDataResponse = await fetch(
          "http://localhost:5000/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const updatedData = await updatedDataResponse.json();

        // Update state with the fetched data
        setBoards((prevBoards) =>
          prevBoards.map((board) => {
            return {
              ...board,
              cards: board.cards.filter((card) => card._id !== cardId),
            };
          })
        );

        const targetBoardIndex = boards.findIndex(
          (board) => board.id === targetBoardId
        );

        setBoards((prevBoards) =>
          prevBoards.map((board, index) => {
            if (index === targetBoardIndex) {
              return {
                ...board,
                cards: [
                  ...board.cards,
                  updatedData.find((task) => task._id === cardId),
                ],
              };
            } else {
              return board;
            }
          })
        );
      } else {
        console.error("Failed to move card:", response.statusText);
      }
    } catch (error) {
      console.error("Error moving card:", error);
    }
  };

  const isInBoard = (cardId, boardId) => {
    return boards.some((board) => {
      return (
        board.id === boardId && board.cards.some((card) => card._id === cardId)
      );
    });
  };

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== btnRef.current) {
      setOpen(false);
    }
  });

  const handleUpdate = () => {
    alert("This feature is under development")
  }

  // console.log(boards);
  // console.log()
  // const date = new Date().toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric"
  // })
  // console.log(date)

  return (
    <div className={styles.boardSection}>
      <div className={styles.welcome_date}>
        {userName && (
          <div className={styles.welcome_span}>
            <span>Welcome! {userName}</span>
          </div>
        )}
        <div className={styles.date_span}>
          <span>{formattedDate}</span>
        </div>
      </div>
      <div className={styles.board_weekFilter}>
        <div className={styles.board_span}>
          <span>Board</span>
        </div>
        <div className={styles.week_filter}>
          <span>This week</span>
          <img
            ref={btnRef}
            onClick={() => setOpen(!open)}
            src="/icons/dropdown.svg"
            alt="dropdown"
          />
          {open && (
            <div ref={menuRef} className={styles.week_filter_options}>
              <span>This week</span>
              <span onClick={handleUpdate}>This month</span>
              <span onClick={handleUpdate}>This year</span>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.boardsContainer} ${styles.custom_scroll}`}>
        <div className={styles.boards}>
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              onMoveCard={moveCard}
              isInBoard={(cardId, boardId) => isInBoard(cardId, boardId)}
              addButton={board.id === 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardSection;
