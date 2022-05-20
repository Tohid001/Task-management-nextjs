import { useState } from "react";

function useForm<X, T extends {}>(initialValue: T) {
  const [formstates, setFormstates] = useState(initialValue);

  const onChangeHandler = <
    Y,
    X extends { name: string; value: Y },
    T extends { target: X }
  >(
    event: T
  ): void => {
    setFormstates((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const resetHandler = () => {
    console.log("reset called");
    setFormstates(initialValue);
  };

  return { formstates, setFormstates, onChangeHandler, resetHandler };
}

export default useForm;
