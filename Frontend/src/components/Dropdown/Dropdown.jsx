import React, { useEffect, useRef } from "react";

const Dropdown = (props) => {
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef && !dropdownRef.current.contains(e.target)) {
        props.onClose && props.onClose();
      }
    };

    if (props.show) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [props.show]);

  return (
    props.show && (
      <div
        ref={dropdownRef}
        style={{
          position: "absolute",
          top: "100%",
          right: "0",
        }}
      >
        {props.children}
      </div>
    )
  );
};

export default Dropdown;
