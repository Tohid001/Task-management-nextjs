
import React from "react";
import type { ReactElement } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { TextInput, ErrorIndicator } from "../Input/index";
import { v4 } from "uuid";
import { Moment } from "moment";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
} from "../../data/form.styled";

interface MyFormValues {
  taskId:string; action:string; actualTime:number;
}

const initialValues: MyFormValues = {
  taskId: "",
  action: "",
  actualTime:2
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});


type RegistryFormProps<X, Z> = {
  date: Moment;
  nest?: boolean;
  submitHandler: Function;
  modal: <F extends (a: boolean) => boolean>(param: F) => void;
  initialState: Z;
};

function RegistryForm<A extends number|string, X, Z extends { [index: string]: A }>({
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
       
       
      >
      
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






<Formik
initialValues={initialValues}
onSubmit={(values, actions) => {
  console.log({ values, actions });
  submitHandler({
    id: v4(),
    registeredAt: {
      month: date.clone().format("M"),
      day: date.clone().format("D"),
      year: date.clone().format("YYYY"),
      time: date.clone().format("h:mm:ss a"),
    },
    values.taskId,
    values.action,
    values.actualTime,
  });
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
    <FormContainer onSubmit={handleSubmit}  timeRegestry={true}>
        <CancelButton
          onClick={() => {
            modal((prev) => {
              return !prev;
            });
          }}
        >
          Cancel
        </CancelButton>

      <Field
        name="email"
        render={({ field, form, meta }: FieldProps) => {
          return (
            <TextInputContainer>
              <TextInput
                {...field}
                label="E-mail"
                placeholder="Enter your e-mail"
                autoFocus={false}
                type="email"
              />
            </TextInputContainer>
          );
        }}
      />

      <ErrorMessage name="email">
        {(message) => {
          return <ErrorIndicator message={message} />;
        }}
      </ErrorMessage>

      <Field
        name="password"
        render={({ field, form, meta }: FieldProps) => {
          return (
            <TextInputContainer>
              <TextInput
                {...field}
                label="Password"
                placeholder="Enter your Password"
                autoFocus={false}
                type="password"
              />
            </TextInputContainer>
          );
        }}
      />

      <ErrorMessage name="password">
        {(message) => {
          return <ErrorIndicator message={message} />;
        }}
      </ErrorMessage>

      <ButtonContainer isResetDisable={false} disableSubmit={false}>
        <button type="submit">Sign in</button>
        <button
          type="reset"
          disabled={
            Object.values(values).filter((value) => value.length !== 0)
              .length == 0
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