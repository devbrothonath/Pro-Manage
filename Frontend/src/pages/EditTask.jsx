import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTasksContext from "../hooks/useTasksContext";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./EditTask.module.css";

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  const { dispatch } = useTasksContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatDate, setFormatDate] = useState(null);
  const [showDate, setShowDate] = useState("");
  // console.log(showDate)
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
      const json = await response.json();
      setTask(json);

      setCompletedTasksCount(
        json.tasklist.filter((task) => task.isCompleted).length
      );

      if (json.dueDate !== null) {
        const fullDate = format(json.dueDate, "MMMM dd yyyy");
        setShowDate(fullDate);
        // console.log(showDate)
      }
    };
    fetchTask();
  }, [id]);

  const handleInputChange = (e, taskIndex) => {
    const { name, value, checked } = e.target;

    if (name === "priority") {
      setTask({ ...task, [name]: value });
    } else if (name.startsWith("task")) {
      const tasklist = [...task.tasklist];
      tasklist[taskIndex].value = value;
      setTask({ ...task, tasklist });
    } else if (name === `completed${taskIndex}`) {
      const tasklist = [...task.tasklist];
      tasklist[taskIndex].isCompleted = checked;
      setTask({ ...task, tasklist });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleAddTask = () => {
    setTask({
      ...task,
      tasklist: [
        ...task.tasklist,
        {
          value: "",
          isCompleted: false,
        },
      ],
    });
  };

  const handleDeleteTask = (taskIndex) => {
    const updatedtasklist = [...task.tasklist];
    updatedtasklist.splice(taskIndex, 1);
    setTask({ ...task, tasklist: updatedtasklist });
  };

  const handleDateChange = (date) => {
    const utcDate = date
      ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      : null;

    setSelectedDate(utcDate);

    const formattedDate = utcDate
      ? utcDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    console.log(formattedDate);
    setFormatDate(formattedDate);

    setTask({ ...task, dueDate: formattedDate });
  };

  console.log(task);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task._id);
    const response = await fetch(
      "http://localhost:5000/api/tasks/" + task._id,
      {
        method: "PATCH",
        body: JSON.stringify({
          ...task,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      dispatch({ type: "UPDATE_TASK", payload: json });
    }
  };

  const checkedTasks = ( task && task.tasklist.filter((task) => task.isCompleted).length)

  // console.log(showDate)
  return (
    <div>
      {task && (
        <div className={styles.editTask}>
          <div className={styles.title}>
            <label>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={styles.priority}>
            <div>
              <span>Current priority </span>
              <span>{task.priority}</span>
            </div>
            <label>
              Select New Priority <span className={styles.required}>*</span>
            </label>
            <button
              name="priority"
              value="high"
              onClick={(e) => handleInputChange(e)}
            >
              <img src="/icons/redCircle.svg" alt="red-icon" />
              HIGH PRIORITY
            </button>
            <button
              name="priority"
              value="moderate"
              onClick={(e) => handleInputChange(e)}
            >
              <img src="/icons/blueCircle.svg" alt="blue-icon" />
              MODERATE PRIORITY
            </button>
            <button
              name="priority"
              value="low"
              onClick={(e) => handleInputChange(e)}
            >
              <img src="/icons/greenCircle.svg" alt="green-icon" />
              LOW PRIORITY
            </button>
          </div>
          <div className={`${styles.tasks} ${styles.custom_scroll}`}>
            <div className={styles.tasks_tasklist}>
              <label>Checklist </label>
              <span>
                ({checkedTasks}/{task.tasklist.length})
              </span>
              <span className={styles.required}> *</span>
              <div className={`${styles.task_list} ${styles.custom_scroll}`}>
                {task &&
                  task.tasklist.map((task, taskIndex) => (
                    <div key={taskIndex} className={styles.task}>
                      <input
                        type="checkbox"
                        name={`completed${taskIndex}`}
                        checked={task.isCompleted}
                        onChange={(e) => handleInputChange(e, taskIndex)}
                      />
                      <input
                        type="text"
                        placeholder="Add Task"
                        name={`task${taskIndex}`}
                        value={task.value}
                        onChange={(e) => handleInputChange(e, taskIndex)}
                      />
                      <button onClick={() => handleDeleteTask(taskIndex)}>
                        <img src="/icons/trash.svg" alt="trash-icon" />
                      </button>
                    </div>
                  ))}
              </div>
              <div className={styles.tasks_add_new}>
                <button onClick={handleAddTask}>+ Add New</button>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.footer_due_date}>
              <div>
                <span>Current Due Date </span>
                <span>{showDate ? showDate : "No date"}</span>
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select New Due Date"
                minDate={new Date()}
                dateFormat="MMMM dd yyyy"
                // value={task.dueDate}
              />
            </div>
            <div className={styles.footer_actions}>
              <div className={styles.footer_actions_cancel}>
                {/* <button onClick={() => props.onClose()}>Cancel</button> */}
              </div>
              <div className={styles.taskform_footer_actions_save}>
                <button onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>

          {/* <button onClick={handleSubmit}>Save</button> */}
        </div>
      )}
    </div>
  );
};

export default EditTask;
