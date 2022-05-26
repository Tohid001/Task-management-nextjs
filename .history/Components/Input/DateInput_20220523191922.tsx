import React, { useRef, useEffect } from "react";
import { inputProps } from "./interfaces";

function DateInput({
  required = true,
  value,
  name,
  onChangeHandler,
  placeholder,
  label,
  type = "date",
}: inputProps) {
  // const inputRef = useRef(null);
  // useEffect(() => {
  //   !label && inputRef.current.focus();
  // }, []);
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        required={required}
        // ref={inputRef}
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default DateInput;