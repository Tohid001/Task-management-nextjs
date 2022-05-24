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
  taskId: Yup.string().required("required"),
  action: Yup.string()
    .required("Please Enter your password"),
  actualTime: Yup.number()
    .required("Please Enter your actual time"),
   
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
 
  return (
    <>
     <Formik
initialValues={initialState}
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
    </>
  );
}

export default RegistryForm;






