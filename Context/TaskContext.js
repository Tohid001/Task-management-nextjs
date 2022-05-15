import React, { createContext, useReducer, useEffect } from "react";

let Context = null;
const { Provider, Consumer } = (Context = createContext());

const initialState = [];
const reducer = (state, { type, value }) => {
  switch (type) {
    case "addTask":
      return [...state, value];
    case "manipulateTask":
      return [...value];

    default:
      return state;
  }
};

function UserProvider(props) {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider
      value={{
        data,
        dispatch,
      }}
    >
      {props.children}
    </Provider>
  );
}
export { UserProvider, Consumer as UserConsumer, Context as UserContext };
