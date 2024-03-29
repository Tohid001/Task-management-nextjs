import React from 'react';
import type { ReactElement } from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { TextInput, ErrorIndicator, SelectInput } from '@/Input/index';
import { v4 } from 'uuid';
import { Moment } from 'moment';

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  CancelButton,
  SelectInputContainer,
} from '@/Form/Form.styled';

import moment from 'moment';

// interface MyFormValues {
//   [index: string]: string | number;
// }

// const initialValues: MyFormValues = {
//   taskId: "",
//   action: "",
//   actualTime: 2,
// };

const validationSchema = Yup.object({
  taskId: Yup.string().required('required'),
  action: Yup.string().required('Please Enter your actions'),
  actualTime: Yup.number().required('Please Enter your actual time'),
});

type RegistryFormProps<X, Z> = {
  date: Moment;
  nest?: boolean;
  submitHandler: Function;
  modal: <F extends (a: boolean) => boolean>(param: F) => void;
  initialState: Z;
  timeRegestry?: boolean;
  taskIdList: string[];
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
  timeRegestry = true,
  initialState,
  taskIdList,
}: RegistryFormProps<X, Z>) {
  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        submitHandler({
          registeredAt: date.clone().format('MMMM Do YYYY'),
          taskId: values.taskId,
          action: values.action,
          actualTime: values.actualTime,
          id: v4(),
          createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
          lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
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
          <FormContainer onSubmit={handleSubmit} timeRegestry={timeRegestry}>
            <CancelButton
              onClick={() => {
                modal((prev) => {
                  return !prev;
                });
              }}
            >
              Cancel
            </CancelButton>

            {/* <Field
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
            </ErrorMessage> */}

            <Field
              name="taskId"
              render={({ field, form, meta }: FieldProps) => {
                return (
                  <SelectInputContainer>
                    <SelectInput
                      {...field}
                      label="TaskId"
                      options={taskIdList}
                    />
                  </SelectInputContainer>
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
              <button type="submit">Register Task</button>
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
