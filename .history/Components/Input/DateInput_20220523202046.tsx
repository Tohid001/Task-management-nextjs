import React, { useRef, useEffect } from "react";
import { inputProps } from "./interfaces";

function DateInput({
  value,
  name,
  onChange,
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
        // ref={inputRef}
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default DateInput;
