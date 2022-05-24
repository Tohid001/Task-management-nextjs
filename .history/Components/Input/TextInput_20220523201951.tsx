import React, { useRef, useEffect } from "react";
import { textProps } from "./interfaces";

function TextInput({
  value,
  name,
  onChange,
  autoFocus = true,
  placeholder,
  label,
  type = "text",
}: textProps) {
  const inputRef = useRef(null);
  // useEffect(() => {
  //   !label && inputRef.current.focus();
  // }, []);
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={inputRef}
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </>
  );
}

export default TextInput;
