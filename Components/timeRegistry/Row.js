import React, { useState, useEffect } from "react";
import RegistryForm from "../Form/RegistryForm";
import EditableCell from "../../Components/Cell/EditableCell";
import { TextInput, DateInput } from "../../Components/Input";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

function Row({ date }) {
  const [modal, setModal] = useState(false);
  const [rTask, setRtask] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:5000/timeRegistry?registeredAt.month=${date
          .clone()
          .format("M")}&registeredAt.day=${date.clone().format("D")}`
      );

      setRtask(response.data);
    };
    fetch();
  }, [date]);

  console.log(date.format("D"), rTask);

  const taskInfoFieldUpdateHandler = async (id, body) => {
    await axios.patch(`http://localhost:5000/timeRegistry/${id}`, body);
    const index = rTask.findIndex((task) => {
      return task.id === id;
    });
    const test = [...rTask];
    test[index] = { ...test[index], ...body };
    setRtask(test);
  };

  const addTasktoSpecificRehgistryDate = async (body) => {
    const response = await axios.post(
      `http://localhost:5000/timeRegistry`,
      body
    );
    console.log("submit called", response);

    setRtask([...rTask, body]);
    setModal((prev) => !prev);
  };
  // console.log(date.format("D"), "hello");
  return (
    <>
      <tr>
        <th id="date" rowSpan={rTask?.length + 1 || 1}>
          {date.format("MMMM Do")}
          <span
            onClick={() => {
              setModal((prev) => !prev);
            }}
          >
            <AiOutlinePlus />
          </span>
          {modal && (
            <RegistryForm
              date={date}
              submitHandler={addTasktoSpecificRehgistryDate}
              initialState={{
                taskId: "",
                action: "",
                actualTime: "",
              }}
              modal={setModal}
              nest={true}
            />
          )}
        </th>
      </tr>
      {rTask?.map(({ id, taskId, action, actualTime }, index) => {
        return (
          <tr key={index}>
            <td>
              <EditableCell
                taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                id={id}
                initialState={{ taskId }}
                value={taskId}
              >
                {(options) => {
                  return <TextInput {...options} placeholder="enter task Id" />;
                }}
              </EditableCell>
            </td>
            <td>
              <EditableCell
                taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                id={id}
                initialState={{ action }}
                value={action}
              >
                {(options) => {
                  return <TextInput {...options} placeholder="enter action" />;
                }}
              </EditableCell>
            </td>
            <td>
              <EditableCell
                taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                id={id}
                initialState={{ actualTime }}
                value={actualTime}
              >
                {(options) => {
                  return (
                    <TextInput {...options} placeholder="enter actual time" />
                  );
                }}
              </EditableCell>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default Row;
