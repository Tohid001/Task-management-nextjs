import React from "react";

function ErrorMessage({ children }: {}) {
  return <div style={{ color: "red" }}>{children}</div>;
}

export default ErrorMessage;
