import React, { useState, useEffect, useMemo } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import EditableCell from '@/Cell/EditableCell';
import { TextInput, SelectInput } from '@/Input/index';
import Pagination from '@/Pagination/Pagination';
import axios from 'axios';
import { data } from 'constants/index';

const { selectOptions, taskListColumns } = data;

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage, setTasksPerPage] = useState<number>(4);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`api/tasks`);
      console.log('get', response.data);
      setTaskList(response.data);
    };
    fetch();
  }, []);

  const indexofLastTask = currentPage * tasksPerPage;
  const indexofFirstTask = indexofLastTask - tasksPerPage;
  const currentTasks = taskList.slice(indexofFirstTask, indexofLastTask);

  console.log('currentTasks', currentTasks);

  const paginate = (number: number): void => {
    setCurrentPage(number);
  };

  const deleteHandler = async (id: string | number) => {
    await axios.delete(`api/tasks/${id}`);
    const filteredTasks = taskList.filter((task, index) => {
      return task.id !== id;
    });
    setTaskList(filteredTasks);
  };

  const taskInfoFieldUpdateHandler = async (id: string | number, body: {}) => {
    await axios.patch(`api/tasks/${id}`, body);
    const index: number = taskList?.findIndex((task) => {
      return task.id === id;
    });
    const test = [...taskList];
    test[index] = { ...test[index], ...body };
    setTaskList(test);
  };

  return (
    <>
      <table>
        <caption>Task List</caption>
        <thead>
          <tr>
            <th colSpan={5}>Task Info</th>
          </tr>
          <tr>
            <th>Task Id</th>
            <th>Task Title</th>

            <th>Estimated Time</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length > 0 &&
            currentTasks.map((task, index) => {
              return (
                <>
                  <tr key={index}>
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
      <Pagination
        tasksPerpage={tasksPerPage}
        totalTasks={taskList.length}
        paginate={paginate}
        currentTotalTasks={currentTasks.length}
      />
    </>
  );
}

export default Home;
