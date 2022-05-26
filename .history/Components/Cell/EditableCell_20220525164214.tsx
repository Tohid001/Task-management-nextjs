import React, { useState } from "react";
import { FaSave, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import useForm from "../../Hooks/useForm";
import { IconContainer, SubRow } from "./EditableCell.styled";

type EditableCellProps<T, X> = {
  id: string;
  initialState: T;
  value: string;
  children: (options: {
    state: X;
    onChangeHandler: <
      A,
      B extends { name: string; value: A },
      C extends { target: B }
    >(
      event: C
    ) => void;
    name: string;
  }) => React.ReactNode;
  taskInfoFieldUpdateHandler: (id: string, formstates: T) => void;
};

function EditableCell<X extends string, T extends { [index: string]: X }>({
  id,
  initialState,
  value,
  children,
  taskInfoFieldUpdateHandler,
}: EditableCellProps<T, X>) {
  const [isEdit, setEdit] = useState<boolean>(false);

  const { formstates, onChangeHandler, resetHandler } = useForm(initialState);

  console.log(initialState.);

  const options = {
    state: formstates[Object.keys(initialState)[0]],
    onChangeHandler,
    name: Object.keys(initialState)[0],
  };

  return (
    <SubRow>
      {!isEdit ? <p>{value}</p> : children(options)}
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
