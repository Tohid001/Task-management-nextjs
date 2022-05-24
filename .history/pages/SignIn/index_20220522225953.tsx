import React from "react";
import useForm from "../../Hooks/useForm";
import { TextInput } from "../../Components/Input/index";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
} from "../../Components/Form/Form.styled";

function SignInForm() {
  const { formstates, onChangeHandler, resetHandler } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formstates;

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formstates);
        }}
        type="signIn"
      >
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
    </>
  );
}

export default SignInForm;

SignInForm.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
