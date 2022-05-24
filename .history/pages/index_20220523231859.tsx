// import React, { useState, useEffect } from "react";
// import { AiFillDelete } from "react-icons/ai";
// import EditableCell from "../Components/Cell/EditableCell";
// import {
//   TextInput,
//   SelectInput,
//   ErrorIndicator,
// } from "../Components/Input/index";
// import axios from "axios";
// import { data } from "../constants/index";

// const { initialState, selectOptions } = data;

// interface task {
//   id: string;
//   title: string;
//   description: string;
//   estimatedTime: number;
//   priority: string;
// }

// function Home() {
//   const [taskList, setTaskList] = useState<task[]>([] as task[]);
//   const [modal, setModal] = useState<boolean>(true);

//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get("http://localhost:3000/tasks");
//       // console.log(response.data);
//       setTaskList(response.data);
//     };
//     fetch();
//   }, []);

//   const deleteHandler = async (id: string) => {
//     await axios.delete(`http://localhost:3000/tasks/${id}`);
//     const filteredTasks = taskList.filter((task, index) => {
//       return task.id !== id;
//     });
//     setTaskList(filteredTasks);
//   };

//   const taskInfoFieldUpdateHandler = async (id: string, body: {}) => {
//     await axios.patch(`http://localhost:3000/tasks/${id}`, body);
//     const index: number = taskList?.findIndex((task) => {
//       return task.id === id;
//     });
//     const test = [...taskList];
//     test[index] = { ...test[index], ...body };
//     setTaskList(test);
//   };

//   return (
//     <table>
//       <caption>Task List</caption>
//       <thead>
//         <tr>
//           <th colSpan={7}>Task Info</th>
//         </tr>
//         <tr>
//           <th>Serial No.</th>
//           <th>Task Id</th>
//           <th>Task Title</th>
//           <th>Task Description</th>
//           <th>Estimated Time</th>
//           <th>Priority</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {taskList.length > 0 &&
//           taskList.map((task, index) => {
//             return (
//               <>
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{task.id}</td>
//                   <td>
//                     <EditableCell
//                       taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
//                       id={task.id}
//                       initialState={{ title: task.title }}
//                       value={task.title}
//                     >
//                       {(options) => {
//                         return (
//                           <TextInput
//                             {...options}
//                             placeholder="Enter your Title"
//                             autoFocus={false}
//                             type="text"
//                           />
//                         );
//                       }}
//                     </EditableCell>
//                   </td>
//                   <td>
//                     <EditableCell
//                       taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
//                       id={task.id}
//                       initialState={{ description: task.description }}
//                       value={task.description}
//                     >
//                       {(options) => {
//                         return (
//                           <TextInput
//                             {...options}
//                             placeholder="Enter your description"
//                             autoFocus={false}
//                             type="textarea"
//                           />
//                         );
//                       }}
//                     </EditableCell>
//                   </td>
//                   <td>
//                     <EditableCell
//                       taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
//                       id={task.id}
//                       initialState={{ estimatedTime: task.estimatedTime }}
//                       value={task.estimatedTime}
//                     >
//                       {(options) => {
//                         return (
//                           <TextInput
//                             {...options}
//                             placeholder="Enter your estimated time"
//                             autoFocus={false}
//                             type="number"
//                           />
//                         );
//                       }}
//                     </EditableCell>
//                   </td>
//                   <td>
//                     <EditableCell
//                       taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
//                       id={task.id}
//                       initialState={{ priority: task.priority }}
//                       value={task.priority}
//                     >
//                       {(options) => {
//                         return (
//                           <SelectInput {...options} options={selectOptions} />
//                         );
//                       }}
//                     </EditableCell>
//                   </td>
//                   <td className="actions">
//                     <span
//                       onClick={() => {
//                         deleteHandler(task.id);
//                       }}
//                     >
//                       <AiFillDelete />
//                     </span>
//                   </td>
//                 </tr>
//               </>
//             );
//           })}
//       </tbody>
//     </table>
//   );
// }

// export default Home;

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

// import useForm from "../../Hooks/useForm";
import { v4 } from "uuid";
import { TextInput, SelectInput, ErrorIndicator } from "../Components/Input";
import axios from "axios";

import { data } from "../constants";

import {
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  SelectInputContainer,
} from "../Components/Form/Form.styled";

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
    await axios.post("http://localhost:3000/tasks", {
      ...formstates,
      id: v4(),
    });
    console.log("submit");
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
          </FormContainer>
        );
      }}
    />
  );
}

export default Form;
