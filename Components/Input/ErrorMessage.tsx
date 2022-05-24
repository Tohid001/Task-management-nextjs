import React from "react";

function ErrorIndicator({ message }: { message: string }) {
  return <div style={{ color: "red", marginBottom: "10px" }}>{message}</div>;
}

export default ErrorIndicator;
