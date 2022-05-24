import React, { useState, useEffect } from "react";
import RegistryForm from "../Form/RegistryForm";
import EditableCell from "../Cell/EditableCell";
import { TextInput, DateInput } from "../Input";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import moment from "moment";

interface rTask {
  id: string;
  taskId: string;
  action: string;
  actualTime: number;
}

function Row({
  date,
  registryInfoColSpan,
}: {
  date: moment.Moment;
  registryInfoColSpan?: number;
}) {
  const [modal, setModal] = useState<boolean>(false);
  const [rTask, setRtask] = useState<rTask[]>([] as rTask[]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:${
          process.env.JSON_PORT
        }/timeRegistry?registeredAt.month=${date
          .clone()
          .format("M")}&registeredAt.day=${date.clone().format("D")}`
      );

      setRtask(response.data);
    };
    fetch();
  }, [date]);

  const taskInfoFieldUpdateHandler = async (id: string, body: {}) => {
    await axios.patch(
      `http://localhost:${process.env.JSON_PORT}/timeRegistry/${id}`,
      body
    );
    const index = rTask.findIndex((task) => {
      return task.id === id;
    });
    const test = [...rTask];
    test[index] = { ...test[index], ...body };
    setRtask(test);
  };

  const addTasktoSpecificRehgistryDate = async (body: rTask) => {
    const response = await axios.post(
      `http://localhost:${process.env.JSON_PORT}/timeRegistry`,
      body
    );
    console.log("submit called", response);

    setRtask([...rTask, body]);
    setModal((prev) => !prev);
  };

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
                actualTime: 0,
              }}
              modal={setModal}
              nest={true}
            />
          )}
        </th>
      </tr>
      {rTask.map(({ id, taskId, action, actualTime }, index) => {
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
                  return (
                    <TextInput
                      {...options.field}
                      placeholder="Enter a taskId"
                      autoFocus={false}
                      type="text"
                    />
                  );
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
                  return (
                    <TextInput
                      {...options.field}
                      placeholder="Enter your actions"
                      autoFocus={false}
                      type="textarea"
                    />
                  );
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
                    <TextInput
                      {...options.field}
                      placeholder="Enter actual time"
                      autoFocus={false}
                      type="number"
                    />
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
