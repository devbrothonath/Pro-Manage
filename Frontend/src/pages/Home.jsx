import React, { useState } from "react";

// styles
import styles from "./Home.module.css";

// components
import HomeMenu from "../components/HomeMenu/HomeMenu.jsx";
import HomeContent from "../components/HomeContent/HomeContent.jsx";

const Home = () => {
  // const [tasks, setTasks] = useState(null);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await fetch("http://localhost:5000/api/tasks");
  //     const json = await response.json();

  //     if (response.ok) {
  //       setTasks(json);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const [activeSection, setActiveSection] = useState("Board");
  const handleButtonClick = (label) => {
    setActiveSection(label);
  };
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <HomeMenu handleButtonClick={handleButtonClick} />
        <HomeContent activeSection={activeSection} />
      </div>
      {/* <div className="tasks">
        {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
      </div> */}
    </div>
  );
};

export default Home;
