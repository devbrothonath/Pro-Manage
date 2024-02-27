import React, { useEffect, useState } from "react";

import styles from "./AnalyticsSection.module.css";
import useAuthContext from "../../hooks/useAuthContext";

const AnalyticsSection = () => {
  const { user } = useAuthContext();
  const [low, setLow] = useState("");
  const [moderate, setModerate] = useState("");
  const [high, setHigh] = useState("");
  const [dueDateValue, setDueDateValue] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://pro-manage-xv2j.onrender.com/api/tasks", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      const highTasksFilter = json.filter(
        (item) => item.priority === "high"
      ).length;
      const moderateTasksFilter = json.filter(
        (item) => item.priority === "moderate"
      ).length;
      const lowTasksFilter = json.filter(
        (item) => item.priority === "low"
      ).length;
      const dueDateFilter = json.filter((item) => item.dueDate !== null).length;
      setHigh(highTasksFilter);
      setModerate(moderateTasksFilter);
      setLow(lowTasksFilter);
      setDueDateValue(dueDateFilter);
    };
    fetchTasks();
  }, []);
  const priorityBox = [
    {
      id: 1,
      img: "/icons/grayCircle.svg",
      title: "Low Priority",
      value: low,
    },
    {
      id: 2,
      img: "/icons/grayCircle.svg",
      title: "Moderate Priority",
      value: moderate,
    },
    {
      id: 3,
      img: "/icons/grayCircle.svg",
      title: "High Priority",
      value: high,
    },
    {
      id: 4,
      img: "/icons/grayCircle.svg",
      title: "Due Date Tasks",
      value: dueDateValue,
    },
  ];
  const boardTaskBox = [
    {
      id: 1,
      img: "/icons/grayCircle.svg",
      title: "Backlog Tasks",
      value: 0,
    },
    {
      id: 2,
      img: "/icons/grayCircle.svg",
      title: "To-Do Tasks",
      value: 0,
    },
    {
      id: 3,
      img: "/icons/grayCircle.svg",
      title: "In-Progress Tasks",
      value: 0,
    },
    {
      id: 4,
      img: "/icons/grayCircle.svg",
      title: "Completed Tasks",
      value: 0,
    },
  ];
  return (
    <div className={styles.analyticsSection}>
      <div className={styles.analyticsSection_title}>
        <span>Analytics</span>
      </div>
      <div className={styles.analyticsSection_stats}>
        <div className={styles.analyticsSection_stats_tasks}>
          {boardTaskBox &&
            boardTaskBox.map((task) => (
              <div
                key={task.id}
                className={styles.analyticsSection_stats_tasks_task}
              >
                <div>
                  <img src={task.img} alt="gray-circle-icon" />
                  <span>{task.title}</span>
                </div>
                <span className={styles.value}>{task.value}</span>
              </div>
            ))}
        </div>
        <div className={styles.analyticsSection_stats_tasks}>
          {priorityBox &&
            priorityBox.map((priority) => (
              <div
                key={priority.id}
                className={styles.analyticsSection_stats_tasks_task}
              >
                <div>
                  <img src={priority.img} alt="gray-circle-icon" />
                  <span>{priority.title}</span>
                </div>
                <span className={styles.value}>{priority.value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
