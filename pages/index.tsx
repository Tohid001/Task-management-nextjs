import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import EditableCell from '@/Cell/EditableCell';
import { TextInput, SelectInput } from '@/Input/index';
import axios from 'axios';
import { data } from 'constants/index';
import moment from 'moment';

const { selectOptions } = data;

interface task {
  id: string | number;
  title: string;
  description: string;
  estimatedTime: number;
  priority: string;
  createdAt: string;
  lastUpdated: string;
}

function Home() {
  const [taskList, setTaskList] = useState<task[]>([] as task[]);
  const [modal, setModal] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://etmfjs.herokuapp.com/tasks`);
      console.log('get', response.data);
      setTaskList(response.data);
    };
    fetch();
  }, []);

  const deleteHandler = async (id: string | number) => {
    await axios.delete(`https://etmfjs.herokuapp.com/tasks/${id}`);
    const filteredTasks = taskList.filter((task, index) => {
      return task.id !== id;
    });
    setTaskList(filteredTasks);
  };

  const taskInfoFieldUpdateHandler = async (id: string | number, body: {}) => {
    await axios.patch(`https://etmfjs.herokuapp.com/tasks/${id}`, {
      ...body,
      lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
    const index: number = taskList?.findIndex((task) => {
      return task.id === id;
    });
    const test = [...taskList];
    test[index] = {
      ...test[index],
      ...body,
      lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    setTaskList(test);
  };

  return (
    <table>
      <caption>Task List</caption>
      <thead>
        <tr>
          <th colSpan={7}>Task Info</th>
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
        {taskList.length > 0 &&
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
                          <TextInput
                            {...options.field}
                            placeholder="Enter your Title"
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
                      id={task.id}
                      initialState={{ description: task.description }}
                      value={task.description}
                    >
                      {(options) => {
                        return (
                          <TextInput
                            {...options.field}
                            placeholder="Enter your description"
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
                      id={task.id}
                      initialState={{ estimatedTime: task.estimatedTime }}
                      value={task.estimatedTime}
                    >
                      {(options) => {
                        return (
                          <TextInput
                            {...options.field}
                            placeholder="Enter your estimated time"
                            autoFocus={false}
                            type="number"
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
                          <SelectInput
                            {...options.field}
                            options={selectOptions}
                          />
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

export default Home;
