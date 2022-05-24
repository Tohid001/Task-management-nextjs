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

// interface signUpFormValues {
//   email: string;
//   password: string;
// }

// const initialValues: <X extends {},Y extnends {}> = {
//   email: "",
//   password: "",
// };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

// const onSubmit = <X, Y>(values: X, actions: Y) => {
//   console.log({ values, actions });
//   alert(JSON.stringify(values, null, 2));
//   actions.setSubmitting(false);
// };

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      <FormContainer type="signIn">
        <Field name="email">
          {(props) => {
            const { field, form, meta } = props;
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
        </Field>
        <ErrorMessage name="email">
          {(message) => {
            return <ErrorIndicator message={message} />;
          }}
        </ErrorMessage>

        <TextInputContainer>
          <TextInput
            name="password"
            state={password}
            onChangeHandler={onChangeHandler}
            label="Password"
            placeholder="Enter your password"
            required={true}
            autoFocus={false}
            type="password"
          />
        </TextInputContainer>

        <ButtonContainer
          isResetDisable={
            Object.values(formstates).filter((value) => value.length !== 0)
              .length !== 0
          }
          disableSubmit={false}
        >
          <button type="submit">Sign in</button>
          <button
            type="reset"
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
    </Formik>
  );
};

export default SignInForm;

SignInForm.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
