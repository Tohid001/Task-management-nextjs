import React from "react";
import type { ReactElement } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import useForm from "../../Hooks/useForm";
import { TextInput } from "../../Components/Input/index";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
} from "../../Components/Form/Form.styled";

interface signUpFormValues {
  email: string;
  password: string;
}

const initialValues: signUpFormValues = {
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

const onSubmit = (values, actions) => {
  console.log({ values, actions });
  alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
};

const SignInForm: React.FC<{}> = () => {
  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>
      <FormContainer type="signIn">
        <TextInputContainer>
          <TextInput
            name="email"
            state={email}
            onChangeHandler={onChangeHandler}
            label="E-mail"
            placeholder="Enter your e-mail"
            required={true}
            autoFocus={false}
            type="email"
          />
        </TextInputContainer>
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
