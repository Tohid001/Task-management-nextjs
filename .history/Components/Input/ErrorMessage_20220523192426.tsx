import React from "react";

function ErrorMessage(props) {
  return <div style={{ color: "red" }}>{props.children}</div>;
}

export default ErrorMessage;
