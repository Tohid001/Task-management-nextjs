import React, { useEffect, useState } from "react";
import useCalender from "../../Hooks/useCalender";
import Row from "../../Components/timeRegistry/Row";
import { Moment } from "moment";

function Index() {
  const [value, , calender, previousMonth, nextMonth] = useCalender();
  const [modal, setModal] = useState(false);

  const parentsTyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    width: "30%",
    marginInline: "auto",
  };

  return (
    <>
      <div style={parentsTyles}>
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
            <th rowSpan={2}>Date</th>
            <th colSpan={3}>Registry Info</th>
          </tr>
          <tr>
            <th>Task Id</th>
            <th>Action</th>
            <th>Actual Time</th>
          </tr>
        </thead>
        <tbody>
          {calender?.map((date: Moment, index: number) => {
            return (
              <>
                <Row date={date} registryInfoColSpan={3} />
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
