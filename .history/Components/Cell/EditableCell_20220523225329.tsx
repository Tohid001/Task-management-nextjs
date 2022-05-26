import React, { useState } from "react";
import { FaSave, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
// import useForm from "../../Hooks/useForm";
import { IconContainer, SubRow } from "./EditableCell.styled";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { ErrorIndicator } from "../Input/index";

// interface MyFormValues {
//   [index: string]: string | number;
// }

// const initialValues: MyFormValues = {
//   taskId: "",
//   action: "",
//   actualTime: 2,
// };

const validationSchema = Yup.object({
  taskId: Yup.string().required("required"),
  action: Yup.string().required("Please Enter your actions"),
  actualTime: Yup.number().required("Please Enter your actual time"),
});

type EditableCellProps<T, X> = {
  id: string;
  initialState: T;
  value: string | number;
  children: (options: FieldProps) => React.ReactNode;
  taskInfoFieldUpdateHandler: (id: string, formstates: T) => void;
};

function EditableCell<
  X extends string | number,
  T extends { [index: string]: X }
>({
  id,
  initialState,
  value,
  children,
  taskInfoFieldUpdateHandler,
}: EditableCellProps<T, X>) {
  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <SubRow>
      {!isEdit ? (
        <p>{value}</p>
      ) : (
        <Formik
          initialValues={initialState}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            taskInfoFieldUpdateHandler(id, values);
          }}
          validationSchema={validationSchema}
          render={({
            values,

            handleSubmit,
            handleReset,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
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
              </form>
            );
          }}
        />
      )}
      <IconContainer
        isEdit={isEdit}
        isAbled={
          !(
            Object.values(initialState)[0].toLowerCase() ===
            Object.values(formstates)[0].toLowerCase()
          )
        }
      >
        {!isEdit ? (
          <button
            onClick={() => {
              setEdit((prev) => {
                return !prev;
              });
            }}
          >
            <FaEdit color="blue" size="1rem" />
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setEdit((prev) => {
                  return !prev;
                });
                resetHandler();
              }}
            >
              <GiCancel size="1rem" />
            </button>
            <>
              <button
                disabled={
                  Object.values(initialState)[0].toLowerCase() ===
                  Object.values(formstates)[0].toLowerCase()
                }
                onClick={() => {
                  setEdit((prev) => {
                    return !prev;
                  });
                  taskInfoFieldUpdateHandler(id, formstates);
                }}
              >
                <FaSave size="1rem" />
              </button>
            </>
          </>
        )}
      </IconContainer>
    </SubRow>
  );
}

export default EditableCell;