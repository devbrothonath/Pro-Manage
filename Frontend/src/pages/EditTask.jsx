import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// components
import useTasksContext from "../hooks/useTasksContext";
import useAuthContext from "../hooks/useAuthContext";

// styles
import styles from "./EditTask.module.css";
import scroll from "../components/CustomScroll/CustomScroll.module.css"

const EditTask = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [task, setTask] = useState();
  const { dispatch } = useTasksContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatDate, setFormatDate] = useState(null);
  const [showDate, setShowDate] = useState("");
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

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

      if (json.dueDate !== null) {
        const fullDate = format(json.dueDate, "MMMM dd yyyy");
        setShowDate(fullDate);
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

    setFormatDate(formattedDate);

    setTask({ ...task, dueDate: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch(
      "https://pro-manage-xv2j.onrender.com/api/tasks/" + task._id,
      {
        method: "PATCH",
        body: JSON.stringify({
          ...task,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      toast("something went wrong");
    }

    if (response.ok) {
      dispatch({ type: "UPDATE_TASK", payload: json });
      toast("Task edited");
    }
  };

  const checkedTasks =
    task && task.tasklist.filter((task) => task.isCompleted).length;

  return (
    <div>
      {task && (
        <div className={styles.editTask}>
          <div className={styles.editTask_box}>
            <div className={styles.editTask_title}>
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
            <div className={styles.editTask_priority}>
              <div className={styles.editTask_priority_status}>
                <span>Current priority </span>
                <span className={styles.priority_value}>{task.priority}</span>
              </div>
              <div className={styles.editTask_priority_btns}>
                <label>Select New Priority</label>
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
            </div>
            <div className={`${styles.editTask_tasks} ${scroll.custom_scroll}`}>
              <div className={styles.tasklist}>
                <label>Checklist </label>
                <span>
                  ({checkedTasks}/{task.tasklist.length})
                </span>

                <div className={`${styles.tasks} ${styles.custom_scroll}`}>
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
                <div className={styles.add_new_task}>
                  <button onClick={handleAddTask}>+ Add New</button>
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.footer_due_date}>
                <div className={styles.due_date_status}>
                  <span>Current Due Date </span>
                  <span className={styles.due_date_value}>
                    {showDate ? showDate : "No date"}
                  </span>
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  placeholderText="Select New Due Date"
                  minDate={new Date()}
                  dateFormat="MMMM dd yyyy"
                />
              </div>
              <div className={styles.footer_actions}>
                <div className={styles.footer_actions_cancel}></div>
                <div className={styles.footer_actions_save}>
                  <button onClick={handleSubmit}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTask;
