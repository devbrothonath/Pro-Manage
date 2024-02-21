import React, { useRef } from "react";
import Modal from "../Modal/Modal";

import styles from "./TaskForm.module.css";

const TaskForm = (props) => {
  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    dateInputRef.current.click();
  };
  return (
    <>
      <Modal onClose={() => props.onClose()}>
        <div className={`${styles.taskform} ${styles.custom_scroll}`}>
          <div className={styles.taskform_box}>
            <div className={styles.taskform_box_title}>
              <label>Title</label>
              <input type="text" placeholder="Enter Task Title" />
            </div>
          </div>
          <div className={styles.taskform_priority}>
            <label>Select Priority</label>
            <button>HIGH PRIORITY</button>
            <button>MODERATE PRIORITY</button>
            <button>LOW PRIORITY</button>
            {/* <div className={styles.taskform_priority_btns}>
            </div> */}
          </div>
          <div className={`${styles.taskform_tasks} ${styles.custom_scroll}`}>
            <div className={styles.taskform_tasks_tasklist}>
              <label>Checklist</label>
              <span>(0/0)</span>
              <div className={`${styles.taskform_task_list} ${styles.custom_scroll}`}>
                <div className={styles.taskform_task}>
                  <input type="checkbox" />
                  <span>Task 1</span>
                  <button>
                    <img src="/icons/trash.svg" alt="trash-icon" />
                  </button>
                </div>
                <div className={styles.taskform_task}>
                  <input type="checkbox" />
                  <span>Task 2</span>
                  <button>
                    <img src="/icons/trash.svg" alt="trash-icon" />
                  </button>
                </div>
                <div className={styles.taskform_task}>
                  <input type="checkbox" />
                  <span>Task 2</span>
                  <button>
                    <img src="/icons/trash.svg" alt="trash-icon" />
                  </button>
                </div>
                <div className={styles.taskform_task}>
                  <input type="checkbox" />
                  <span>Task 2</span>
                  <button>
                    <img src="/icons/trash.svg" alt="trash-icon" />
                  </button>
                </div>
                <div className={styles.taskform_task}>
                  <input type="checkbox" />
                  <span>Task 2</span>
                  <button>
                    <img src="/icons/trash.svg" alt="trash-icon" />
                  </button>
                </div>
                <div className={styles.taskform_task}>
                  <input type="checkbox" />
                  <span>Task 2</span>
                  <button>
                    <img src="/icons/trash.svg" alt="trash-icon" />
                  </button>
                </div>
              </div>
              <div className={styles.taskform_tasks_add_new}>
                <button>+ Add New</button>
              </div>
            </div>
          </div>
          <div className={styles.taskform_footer}>
            <div className={styles.taskform_footer_due_date}>
              <button onClick={handleDateClick}>Select Due Date</button>
              {/* <input type="date" ref={dateInputRef} /> */}
            </div>
            <div className={styles.taskform_footer_actions}>
                <div className={styles.taskform_footer_actions_cancel}>
                  <button>Cancel</button>
                </div>
                <div className={styles.taskform_footer_actions_save}>
                  <button>Save</button>
                </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskForm;
