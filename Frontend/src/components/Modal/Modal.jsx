import React from "react";

import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div
      className={styles.modal}
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
