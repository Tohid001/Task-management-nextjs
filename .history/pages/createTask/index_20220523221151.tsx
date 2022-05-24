import React from "react";
import { useRouter } from "next/router";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";

// import useForm from "../../Hooks/useForm";
import { v4 } from "uuid";
import { TextInput, SelectInput, ErrorIndicator } from "../../Components/Input";
import axios from "axios";

import { data } from "../../constants";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  SelectInputContainer,
} from "../../Components/Form/Form.styled";

const { selectOptions } = data;
interface MyFormValues {
  title: string;
  description: string;
  estimatedTime: number;
  priority: string;
}

const initialValues: MyFormValues = {
  title: "",
  description: "",
  estimatedTime: 0,
  priority: "",
};

const validationSchema = Yup.object({
  taskId: Yup.string().required("required"),
  action: Yup.string().required("Please Enter your actions"),
  actualTime: Yup.number().required("Please Enter your actual time"),
});

function Form() {
  const { formstates, onChangeHandler, resetHandler } = useForm({});
  const router = useRouter();
  const { title, description, estimatedTime, priority } = formstates;

  const submitHandler = async () => {
    await axios.post("http://localhost:3000/tasks", {
      ...formstates,
      id: v4(),
    });
    console.log("submit");
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

// import React from "react";
// import type { ReactElement } from "react";
// import { TextInput, ErrorIndicator } from "../Input/index";
// import { v4 } from "uuid";
// import { Moment } from "moment";

// import {
//   FormContainer,
//   TextInputContainer,
//   ButtonContainer,
//   CancelButton,
// } from "../../data/form.styled";

type RegistryFormProps<X, Z> = {
  date: Moment;
  nest?: boolean;
  submitHandler: Function;
  modal: <F extends (a: boolean) => boolean>(param: F) => void;
  initialState: Z;
};

function RegistryForm<
  A extends number | string,
  X,
  Z extends { [index: string]: A }
>({
  date,
  nest = true,
  submitHandler,
  modal,
  initialState,
}: RegistryFormProps<X, Z>) {
  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        submitHandler();
      }}
      validationSchema={validationSchema}
      render={({
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
      }) => {
        return (
          <FormContainer onSubmit={handleSubmit} timeRegestry={true}>
            <Field
              name="taskId"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <TextInputContainer>
                    <TextInput
                      {...field}
                      label="TaskId"
                      placeholder="Enter your TaskID"
                      autoFocus={false}
                      type="text"
                    />
                  </TextInputContainer>
                );
              }}
            />

            <ErrorMessage name="taskId">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <Field
              name="action"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <TextInputContainer>
                    <TextInput
                      {...field}
                      label="Actions"
                      placeholder="Enter your actions"
                      autoFocus={false}
                      type="textarea"
                    />
                  </TextInputContainer>
                );
              }}
            />

            <ErrorMessage name="action">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <Field
              name="actualTime"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <TextInputContainer>
                    <TextInput
                      {...field}
                      label="Actual Time"
                      placeholder="Enter your actions"
                      autoFocus={false}
                      type="number"
                    />
                  </TextInputContainer>
                );
              }}
            />

            <ErrorMessage name="actualTime">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <ButtonContainer isResetDisable={false} disableSubmit={false}>
              <button type="submit">Sign in</button>
              <button
                type="reset"
                disabled={
                  Object.values(values).filter(
                    (value) => value.toString().length !== 0
                  ).length == 0
                }
                onClick={handleReset}
              >
                Reset
              </button>
            </ButtonContainer>
          </FormContainer>
        );
      }}
    />
  );
}

export default RegistryForm;
