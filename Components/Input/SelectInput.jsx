import React from "react";

function SelectInput({
  required,
  state,
  onChangeHandler,
  name,
  label,
  options,
  placeholder,
}) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        required={required}
        id={name}
        value={state}
        onChange={onChangeHandler}
        name={name}
        placeholder={placeholder}
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
