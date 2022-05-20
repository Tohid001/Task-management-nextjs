import React from "react";
import useForm from "../../Hooks/useForm";
import { v4 } from "uuid";
import { TextInput } from "../Input/index";
import { Moment } from "moment";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  CancelButton,
} from "./Form.styled";

type RegistryFormProps<X, Z> = {
  date: Moment;
  nest?: boolean;
  submitHandler: Function;
  modal: <F extends (a: boolean) => boolean>(param: F) => void;
  initialState: Z;
};

function RegistryForm<A extends string, X, Z extends { [index: string]: A }>({
  date,
  nest = true,
  submitHandler,
  modal,
  initialState,
}: RegistryFormProps<X, Z>) {
  const { formstates, setFormstates, onChangeHandler, resetHandler } =
    useForm(initialState);

  const { taskId, action, actualTime } = formstates;

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler({
            id: v4(),
            registeredAt: {
              month: date.clone().format("M"),
              day: date.clone().format("D"),
              year: date.clone().format("YYYY"),
              time: date.clone().format("h:mm:ss a"),
            },
            taskId,
            action,
            actualTime,
          });
        }}
        timeRegestry={true}
      >
        <CancelButton
          onClick={() => {
            modal((prev) => {
              return !prev;
            });
          }}
        >
          Cancel
        </CancelButton>

        <TextInputContainer>
          <TextInput
            name="taskId"
            state={taskId}
            onChangeHandler={onChangeHandler}
            label="Task ID"
            placeholder="Enter a task ID"
            required={true}
            autoFocus={false}
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInput
            name="action"
            state={action}
            onChangeHandler={onChangeHandler}
            label="Action"
            placeholder="Enter your action"
            required={true}
            autoFocus={false}
            type="textarea"
          />
        </TextInputContainer>

        <TextInputContainer>
          <TextInput
            name="actualTime"
            state={actualTime}
            onChangeHandler={onChangeHandler}
            label="Actual Time"
            placeholder="Enter actual time"
            required={true}
            autoFocus={false}
          />
        </TextInputContainer>

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

export default RegistryForm;
