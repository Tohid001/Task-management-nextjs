import React from "react";
import { selectProps } from "./interfaces";

function SelectInput({
  required = true,
  value,
  onChangeHandler,
  name,
  label,
  options,
}: selectProps) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        required={required}
        id={name}
        value={value}
        onChange={onChangeHandler}
        name={name}
      >
        <>
          <option value="" disabled selected hidden>
            Select a priority
          </option>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </>
      </select>
    </>
  );
}

export default SelectInput;
