import React from 'react'

import styles from "./BoardSection.module.css"

const BoardSection = () => {
  return (
    <div className={styles.boardSection}>
        <div className={styles.welcome_date}>
          <div className={styles.welcome_span}>
            <span>Welcome! Dev</span>
          </div>
          <div className={styles.date_span}>
            <span>18th Feb, 2024</span>
          </div>
        </div>
        <div className={styles.board_weekFilter}>
          <div className={styles.board_span}>
            <span>Board</span>
          </div>
          <div className={styles.week_filter}>
            <span>This week</span>
            <img src="/icons/dropdown.svg" alt="dropdown" />
          </div>
        </div>
        <div className={styles.boardsContainer}>
          <div className={styles.backlog}>Backlog</div>
          <div className={styles.toDo}>To Do</div>
          <div className={styles.inProgress}>In Progress</div>
          <div className={styles.done}>Done</div>
        </div>
      </div>
  )
}

export default BoardSection