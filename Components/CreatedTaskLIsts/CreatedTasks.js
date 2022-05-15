import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import EditableCell from "../Cell/EditableCell";
import { TextInput, DateInput, SelectInput } from "../Input/index.js";

import axios from "axios";

import { data } from "../../constants/index.js";

const { initialState, selectOptions } = data;

function CreatedTasks() {
  const [taskList, setTaskList] = useState(null);
  const [modal, setModal] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5000/tasks");
      // console.log(response.data);
      setTaskList(response.data);
    };
    fetch();
  }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    const filteredTasks = taskList.filter((task, index) => {
      return task.id !== id;
    });
    setTaskList(filteredTasks);
  };

  const taskInfoFieldUpdateHandler = async (id, body) => {
    await axios.patch(`http://localhost:5000/tasks/${id}`, body);
    const index = taskList.findIndex((task) => {
      return task.id === id;
    });
    const test = [...taskList];
    test[index] = { ...test[index], ...body };
    setTaskList(test);
  };

  return (
    <table>
      <caption>Task List</caption>
      <thead>
        <tr>
          <th colSpan="7">Task Info</th>
        </tr>
        <tr>
          <th>Serial No.</th>
          <th>Task Id</th>
          <th>Task Title</th>
          <th>Task Description</th>
          <th>Estimated Time</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {taskList?.length > 0 &&
          taskList.map((task, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.id}</td>
                  <td>
                    <EditableCell
                      taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                      id={task.id}
                      initialState={{ title: task.title }}
                      value={task.title}
                    >
                      {(options) => {
                        return (
                          <TextInput {...options} placeholder="enter title" />
                        );
                      }}
                    </EditableCell>
                  </td>
                  <td>
                    <EditableCell
                      taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                      id={task.id}
                      initialState={{ description: task.description }}
                      value={task.description}
                    >
                      {(options) => {
                        return (
                          <TextInput
                            {...options}
                            type="textarea"
                            placeholder="enter description"
                          />
                        );
                      }}
                    </EditableCell>
                  </td>
                  <td>
                    <EditableCell
                      taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                      id={task.id}
                      initialState={{ estimatedTime: task.estimatedTime }}
                      value={task.estimatedTime}
                    >
                      {(options) => {
                        return (
                          <TextInput
                            {...options}
                            type="textarea"
                            placeholder="enter estimated time"
                          />
                        );
                      }}
                    </EditableCell>
                  </td>
                  <td>
                    <EditableCell
                      taskInfoFieldUpdateHandler={taskInfoFieldUpdateHandler}
                      id={task.id}
                      initialState={{ priority: task.priority }}
                      value={task.priority}
                    >
                      {(options) => {
                        return (
                          <SelectInput options={selectOptions} {...options} />
                        );
                      }}
                    </EditableCell>
                  </td>
                  <td className="actions">
                    <span
                      onClick={() => {
                        deleteHandler(task.id);
                      }}
                    >
                      <AiFillDelete />
                    </span>
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
}

export default CreatedTasks;
