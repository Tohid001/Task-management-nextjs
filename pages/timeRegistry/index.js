import React, { useEffect, useState } from "react";
import moment from "moment";
import useCalender from "../../Hooks/useCalender";

import Row from "../../Components/timeRegistry/Row";

function Index() {
  const [value, , calender, previousMonth, nextMonth] = useCalender();
  const [modal, setModal] = useState(false);

  // console.log(calender);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "30%",
          marginInline: "auto",
        }}
      >
        <span
          onClick={() => {
            previousMonth();
          }}
          style={{
            cursor: "pointer",
          }}
        >
          prev
        </span>
        <span
          onClick={() => {
            nextMonth();
          }}
          style={{
            cursor: "pointer",
          }}
        >
          next
        </span>
      </div>
      <table>
        <caption>Time Registry</caption>
        <thead>
          <tr>
            <th rowSpan="2">Date</th>
            <th colSpan="3">Registry Info</th>
          </tr>
          <tr>
            <th>Task Id</th>
            <th>Action</th>
            <th>Actual Time</th>
          </tr>
        </thead>
        <tbody>
          {calender?.map((date, index) => {
            return (
              <>
                <Row date={date} />
                {/* {task[Object.keys(task)[0]].map((nestTask, nestTaskId) => {
                    return (
                      <tr id={nestTaskId}>
                        <td>{nestTask.id}</td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ title: nestTask.title }}
                            value={nestTask.title}
                          >
                            {(options) => {
                              return (
                                <TextInput
                                  {...options}
                                  placeholder="enter title"
                                />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ description: nestTask.description }}
                            value={nestTask.description}
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
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ startDate: nestTask.endDate }}
                            value={nestTask.startDate}
                          >
                            {(options) => {
                              return (
                                <DateInput type="datetime-local" {...options} />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ endDate: nestTask.endDate }}
                            value={nestTask.endDate}
                          >
                            {(options) => {
                              return (
                                <DateInput type="datetime-local" {...options} />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td className="actions">
                          <span
                            onClick={() => {
                              deleteHandler(nestTask.id, Object.keys(task)[0]);
                            }}
                          >
                            <AiFillDelete />
                          </span>
                        </td>
                      </tr>
                    );
                  })} */}
                <tr></tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Index;
