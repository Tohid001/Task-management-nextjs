import React from "react";
import { selectProps } from "./interfaces";

function SelectInput({ value, onChange, name, label, options }: selectProps) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} value={value} onChange={onChange} name={name}>
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
