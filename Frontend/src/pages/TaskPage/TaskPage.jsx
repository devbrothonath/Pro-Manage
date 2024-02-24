import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import styles from "./TaskPage.module.css";

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [completedTasksCount, setCompletedTasksCount] = useState();
  const [dueDate, setDueDate] = useState();
  const [formattedDate, setFormattedDate] = useState();
  // const  = format(dueDate, "MMM do")

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
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

      // setCompletedTasksCount(task.tasklist.filter((t) => t.isCompleted).length);
    };
    fetchTask();
  }, [id]);
  // console.log(task.tasklist);
  // console.log(completedTasksCount)

  return (
    <div>
      {task && (
        <div className={styles.taskpage}>
          <div className={styles.taskpage_top}>
            <div className={styles.taskpage_top_label}>{task.priority}</div>
            <div className={styles.taskpage_top_title}>{task.title}</div>
          </div>
          <div className={styles.taskpage_tasks}>
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
            <div className={styles.footer}>
              <span>Due Date</span>
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
