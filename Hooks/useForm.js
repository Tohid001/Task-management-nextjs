import React, { useState } from "react";

function useForm(initialValue) {
  const [formstates, setFormstates] = useState(initialValue);
  // console.log("hook", formstates);

  const onChangeHandler = (e) => {
    setFormstates((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const resetHandler = () => {
    console.log("reset called");
    setFormstates(initialValue);
  };

  return [formstates, setFormstates, onChangeHandler, resetHandler];
}

export default useForm;
