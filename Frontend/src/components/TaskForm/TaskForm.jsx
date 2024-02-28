import React, { useState } from "react";
import useTasksContext from "../../hooks/useTasksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// components
import Modal from "../Modal/Modal";
import useAuthContext from "../../hooks/useAuthContext";

// styles
import styles from "./TaskForm.module.css";
import scroll from "../CustomScroll/CustomScroll.module.css"

const TaskForm = (props) => {
  const { user } = useAuthContext();
  const { dispatch } = useTasksContext();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskCount, setTaskCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [task, setTask] = useState({
    title: "",
    priority: "",
    tasklist: [
      {
        value: "",
        isCompleted: false,
      },
    ],
    dueDate: "",
  });

  const handleInputChange = (e, taskIndex, date) => {
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

    const completedTasksCount = task.tasklist.filter(
      (task) => task.isCompleted
    ).length;
    setCompletedTasks(completedTasksCount);

    setTaskCount(task.tasklist.length);
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

    setTask({ ...task, dueDate: formattedDate });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch(
      "https://pro-manage-xv2j.onrender.com/api/tasks",
      {
        method: "POST",
        body: JSON.stringify({
          ...task,
          tasklist: task.tasklist.map((item) => ({ ...item })),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      // console.log("new task added", json);
      dispatch({ type: "CREATE_TASK", payload: json });
      setTask({
        title: "",
        priority: "",
        tasklist: [
          {
            value: "",
            isCompleted: false,
          },
        ],
        dueDate: "",
      });
      setError(null);
      setEmptyFields([]);
      props.onClose();
    }
  };

  return (
    <>
      <Modal onClose={() => props.onClose()}>
        <div className={`${styles.taskform} ${styles.custom_scroll}`}>
          <div className={styles.taskform_box}>
            <div className={styles.taskform_box_title}>
              <label>
                Title <span className={styles.required}>*</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter Task Title"
                onChange={(e) => handleInputChange(e)}
                value={task.title}
              />
            </div>
          </div>
          <div className={styles.taskform_priority}>
            <div className={styles.taskform_priority_status}>
              <span>Current priority </span>
              <span className={styles.priority_value}>
                {task.priority ? task.priority : "No value"}
              </span>
            </div>
            <div className={styles.taskform_priority_btns}>
              <label>
                Select Priority <span className={styles.required}>*</span>
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
          </div>
          <div className={`${styles.taskform_tasks} ${scroll.custom_scroll}`}>
            <div className={styles.taskform_tasks_tasklist}>
              <label>Checklist </label>
              <span>
                ({completedTasks}/{task.tasklist.length})
              </span>
              <span className={styles.required}>*</span>
              <div
                className={`${styles.taskform_task_list} ${scroll.custom_scroll}`}
              >
                {task &&
                  task.tasklist.map((task, taskIndex) => (
                    <div key={taskIndex} className={styles.taskform_task}>
                      <input
                        type="checkbox"
                        name={`completed${taskIndex}`}
                        checked={task.isCompleted}
                        onChange={(e) => handleInputChange(e, taskIndex)}
                      />
                      <input
                        type="text"
                        placeholder="Add Task"
                        autoFocus
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
              <div className={styles.taskform_tasks_add_new}>
                <button onClick={handleAddTask}>+ Add New</button>
              </div>
            </div>
          </div>
          <div className={styles.taskform_footer}>
            <div className={styles.taskform_footer_due_date}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select Due Date"
                minDate={new Date()}
                dateFormat="MMMM dd yyyy"
                value={task.dueDate}
              />
            </div>
            <div className={styles.taskform_footer_actions}>
              <div className={styles.taskform_footer_actions_cancel}>
                <button onClick={() => props.onClose()}>Cancel</button>
              </div>
              <div className={styles.taskform_footer_actions_save}>
                <button onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
          {error && (
            <div className={styles.error}>Please fill all necessary fields</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TaskForm;
