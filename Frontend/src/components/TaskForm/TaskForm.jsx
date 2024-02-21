import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Modal/Modal";

import styles from "./TaskForm.module.css";

const TaskForm = (props) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskCount, setTaskCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
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

  //   console.log(selectedDate)

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
    setSelectedDate(date);
    const formattedDate = date
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "";
    console.log(formattedDate);
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

  console.log(task);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        ...task,
        tasklist: task.tasklist.map((item) => ({ ...item })),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log("new task added", json);
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
      props.onClose();
    }
  };

  return (
    <>
      <Modal onClose={() => props.onClose()}>
        <div className={`${styles.taskform} ${styles.custom_scroll}`}>
          <div className={styles.taskform_box}>
            <div className={styles.taskform_box_title}>
              <label>Title</label>
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
            <label>Select Priority</label>
            <button
              name="priority"
              value="high"
              onClick={(e) => handleInputChange(e)}
            >
              HIGH PRIORITY
            </button>
            <button
              name="priority"
              value="moderate"
              onClick={(e) => handleInputChange(e)}
            >
              MODERATE PRIORITY
            </button>
            <button
              name="priority"
              value="low"
              onClick={(e) => handleInputChange(e)}
            >
              LOW PRIORITY
            </button>
            {/* <div className={styles.taskform_priority_btns}>
            </div> */}
          </div>
          <div className={`${styles.taskform_tasks} ${styles.custom_scroll}`}>
            <div className={styles.taskform_tasks_tasklist}>
              <label>Checklist</label>
              <span>
                ({completedTasks}/{task.tasklist.length})
              </span>
              <div
                className={`${styles.taskform_task_list} ${styles.custom_scroll}`}
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
                        name={`task${taskIndex}`}
                        value={task.title}
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
              {/* <button onClick={() => setSelectedDate(new Date())}>Select Due Date</button> */}
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select Due Date"
                minDate={new Date()}
                dateFormat="MMMM dd"
                value={task.dueDate}
              />
              {/* <input type="date" ref={dateInputRef} /> */}
            </div>
            <div className={styles.taskform_footer_actions}>
              <div className={styles.taskform_footer_actions_cancel}>
                <button onClick={() => props.onClose()}>Cancel</button>
              </div>
              <div className={styles.taskform_footer_actions_save}>
                <button onClick={handleSubmit}>Save</button>
              </div>
              {error && <div>{error}</div>}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskForm;
