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

import { TextInput, SelectInput, ErrorIndicator } from "@/Input/index";
import axios from "axios";
import moment from "moment";

import { data } from "constants/index";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  SelectInputContainer,
} from "@/Form/Form.styled";

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
  title: Yup.string().required("Please Enter your title"),
  description: Yup.string().required("Please Enter your description"),
  estimatedTime: Yup.number().required("Please Enter your estimated time"),
  priority: Yup.string().required("Please select your priority"),
});

function Form() {
  const router = useRouter();

  const submitHandler = async (formstates: MyFormValues) => {
    const newTask = await axios.post(`api/tasks`, {
      ...formstates,
    });
    console.log("submit", newTask);
    router.push("/");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        submitHandler(values);
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
      }: FormikProps<MyFormValues>) => {
        return (
          <FormContainer onSubmit={handleSubmit}>
            <Field
              name="title"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <TextInputContainer>
                    <TextInput
                      {...field}
                      label="Title"
                      placeholder="Enter your Title"
                      autoFocus={false}
                      type="text"
                    />
                  </TextInputContainer>
                );
              }}
            />

            <ErrorMessage name="title">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <Field
              name="description"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <TextInputContainer>
                    <TextInput
                      {...field}
                      label="Description"
                      placeholder="Enter your description"
                      autoFocus={false}
                      type="textarea"
                    />
                  </TextInputContainer>
                );
              }}
            />

            <ErrorMessage name="description">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <Field
              name="estimatedTime"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <TextInputContainer>
                    <TextInput
                      {...field}
                      label="Estimated Time"
                      placeholder="Enter your estimated time"
                      autoFocus={false}
                      type="number"
                    />
                  </TextInputContainer>
                );
              }}
            />

            <ErrorMessage name="estimatedTime">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <Field
              name="priority"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <SelectInputContainer>
                    <SelectInput
                      {...field}
                      label="Priority"
                      options={selectOptions}
                    />
                  </SelectInputContainer>
                );
              }}
            />

            <ErrorMessage name="priority">
              {(message) => {
                return <ErrorIndicator message={message} />;
              }}
            </ErrorMessage>

            <ButtonContainer isResetDisable={false} disableSubmit={false}>
              <button type="submit">Create Task</button>
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

export default Form;
