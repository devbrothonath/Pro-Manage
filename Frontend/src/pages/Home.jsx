import React, { useEffect, useState } from "react";

import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

// styles
import styles from "./Home.module.css"
import HomeMenu from "../components/HomeMenu/HomeMenu.jsx";

const Home = () => {
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
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <HomeMenu />
        <div className={styles.content}>
          <div className={styles.dashboardSection}>
            <div className={styles.welcome_date}>
              <div>
                <span>Welcome! Dev</span>
              </div>
              <div>
                <span>18th Feb, 2024</span>
              </div>
            </div>
            <div className={styles.board_weekFilter}>
                <div>
                    <span>Board</span>
                </div>
                <div>
                    <span>This week</span>
                </div>
            </div>
            <div className={styles.boardsContainer}>
                <div className={styles.backlog}>Backlog</div>
                <div className={styles.toDo}>To Do</div>
                <div className={styles.inProgress}>In Progress</div>
                <div className={styles.done}>Done</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="tasks">
        {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
      </div> */}
    </div>
  );
};

export default Home;
