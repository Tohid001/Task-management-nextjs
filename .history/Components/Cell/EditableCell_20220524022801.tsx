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

  const validationSchema = Yup.object({
    [Object.keys(initialState)[0]]: Yup.string().required("required"),
  });

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
            setEdit((prev) => {
              return !prev;
            });
          }}
          validationSchema={validationSchema}
          render={({ values, handleSubmit, handleReset }) => {
            console.log("values", values);
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  name={Object.keys(values)[0]}
                  render={(props: FieldProps) => {
                    return children(props);
                  }}
                />

                <ErrorMessage name="taskId">
                  {(message) => {
                    return <ErrorIndicator message={message} />;
                  }}
                </ErrorMessage>

                <IconContainer
                  isEdit={isEdit}
                  isAbled={
                    !(
                      Object.values(initialState)[0]
                        .toString()
                        .toLowerCase() ===
                      Object.values(values)[0].toString().toLowerCase()
                    )
                  }
                >
                  <>
                    <button type="reset" onClick={handleReset}>
                      <GiCancel size="1rem" />
                    </button>

                    <button
                      type="submit"
                      disabled={
                        Object.values(initialState)[0]
                          .toString()
                          .toLowerCase() ===
                        Object.values(values)[0].toString().toLowerCase()
                      }
                      // onClick={() => {
                      //   setEdit((prev) => {
                      //     return !prev;
                      //   });
                      // }}
                    >
                      <FaSave size="1rem" />
                    </button>
                  </>
                </IconContainer>
              </form>
            );
          }}
        />
      )}

      <button
        onClick={() => {
          setEdit((prev) => {
            return !prev;
          });
        }}
      >
        <FaEdit color="blue" size="1rem" />
      </button>
    </SubRow>
  );
}

export default EditableCell;
