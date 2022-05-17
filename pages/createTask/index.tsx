import React from "react";
import { useRouter } from "next/router";
import useForm from "../../Hooks/useForm";
import { v4 } from "uuid";
import { TextInput, DateInput, SelectInput } from "../../Components/Input";
import axios from "axios";

import { data } from "../../constants";
const { selectOptions } = data;

import {
  // OuterMost,
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  SelectInputContainer,
  CancelButton,
} from "../../Components/Form/Form.styled";

function Form() {
  const [formstates, setFormstates, onChangeHandler, resetHandler] = useForm({
    title: "",
    description: "",
    estimatedTime: "",
    priority: "",
  });
  const router = useRouter();
  const { title, description, estimatedTime, priority } = formstates;

  const submitHandler = async () => {
    await axios.post("http://localhost:5000/tasks", {
      ...formstates,
      id: v4(),
    });
    router.push("/");
  };

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <TextInputContainer>
          <TextInput
            name="title"
            state={title}
            onChangeHandler={onChangeHandler}
            label="Task Title"
            placeholder="Enter a task title"
            required={true}
            autoFocus={false}
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInput
            required={true}
            name="description"
            state={description}
            onChangeHandler={onChangeHandler}
            label="Task Description"
            placeholder="Enter  Task description"
            type="textarea"
          />
        </TextInputContainer>

        <TextInputContainer>
          <TextInput
            name="estimatedTime"
            state={estimatedTime}
            onChangeHandler={onChangeHandler}
            label="Estimated Time"
            placeholder=""
            required={true}
            autoFocus={false}
          />
        </TextInputContainer>

        <SelectInputContainer>
          <SelectInput
            name="priority"
            state={priority}
            onChangeHandler={onChangeHandler}
            label="Priority"
            placeholder=""
            required={true}
            autoFocus={false}
            options={selectOptions}
          />
        </SelectInputContainer>

        <ButtonContainer
          isResetDisable={
            Object.values(formstates).filter((value) => value.length !== 0)
              .length !== 0
          }
          disableSubmit={false}
        >
          <button type="submit">Create Task</button>
          <button
            disabled={
              Object.values(formstates).filter((value) => value.length !== 0)
                .length == 0
            }
            onClick={resetHandler}
          >
            Reset
          </button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}

export default Form;
