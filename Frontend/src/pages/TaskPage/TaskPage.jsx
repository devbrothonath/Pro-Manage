import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import styles from "./TaskPage.module.css";
import scroll from "../../components/CustomScroll/CustomScroll.module.css"

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [completedTasksCount, setCompletedTasksCount] = useState();
  const [dueDate, setDueDate] = useState();
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `https://pro-manage-xv2j.onrender.com/api/tasks/${id}`
      );
      const json = await response.json();
      setTask(json);

      setCompletedTasksCount(
        json.tasklist.filter((task) => task.isCompleted).length
      );

      setDueDate(json.dueDate);
      if (json.dueDate !== null) {
        const formatDate = format(json.dueDate, "MMM do");
        setFormattedDate(formatDate);
      }
    };
    fetchTask();
  }, [id]);

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

  return (
    <div className={styles.taskpage}>
      <div className={styles.taskpage_logo}>
        <img src="/icons/codesandbox.svg" alt="logo-icon" />
        <span>Pro Manage</span>
      </div>
      {task && (
        <div className={styles.taskpage_box}>
          <div className={styles.taskpage_top}>
            <div className={styles.taskpage_top_label}>
              <img
                src={getPriorityIcon(task.priority)}
                alt={`${task.priority} priority icon`}
              />
              <span>{task.priority} priority</span>
            </div>
            <div className={styles.taskpage_top_title}>{task.title}</div>
          </div>
          <div className={`${styles.taskpage_tasks} ${scroll.custom_scroll}`}>
            <div className={styles.taskpage_tasks_count}>
              <span>Checklist</span>
              <span>
                ({completedTasksCount}/{task.tasklist.length})
              </span>
            </div>
            <div className={styles.taskpage_tasks_list}>
              {task.tasklist.map((task) => (
                <div key={task._id} className={styles.tasks_task}>
                  <input type="checkbox" defaultChecked={task.isCompleted} />
                  <span>{task.value}</span>
                </div>
              ))}
            </div>
          </div>
          {formattedDate && (
            <div className={styles.taskpage_footer}>
              <span>Due Date</span>
              <span className={styles.date_value}>{formattedDate}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
