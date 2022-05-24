import React from "react";

function ErrorIndicator({ message }: { message: string }) {
  return <div style={{ color: "red" }}>{message}</div>;
}

export default ErrorIndicator;
