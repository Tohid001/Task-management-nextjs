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
import { TextInput, ErrorIndicator } from "../../Components/Input/index";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
} from "../../data/form.styled";

interface MyFormValues {
  email: string;
  password: string;
}

const initialValues: MyFormValues = {
  email: "",
  password: "",
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

const SignInForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      <FormContainer type="signIn">
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
            // disabled={
            //   Object.values(formstates).filter((value) => value.length !== 0)
            //     .length == 0
            // }
          >
            Reset
          </button>
        </ButtonContainer>
      </FormContainer>
    </Formik>
  );
};

export default SignInForm;

SignInForm.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
