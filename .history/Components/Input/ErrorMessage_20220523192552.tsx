import React from "react";

function ErrorMessage({ message }: { message: string }) {
  return <div style={{ color: "red" }}>{message}</div>;
}

export default ErrorMessage;
