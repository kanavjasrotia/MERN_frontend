import React, { useState } from "react";

function Alert(props: any) {
  const [showAlert, setShowAlert] = useState(false);

  function handleMouseEnter() {
    setShowAlert(true);
  }

  function handleMouseLeave() {
    setShowAlert(false);
  }

  return (
    <div
      className={`${style.alert}`}
      style={showAlert ? {} : { display: "none" }}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <span className={style.closebtn}> × </span> */}
      {props.children ? React.cloneElement(props.children) : props.message}
    </div>
  );
}

const style = {
  alert: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  success: {
    color: "#000",
    background: "#dff0d8",
  },
  warning: {
    color: "#fff",
    background: "#fcf8e3",
  },
  error: {
    color: "#fff",
    background: "#f2dede",
  },
};

export default Alert;
