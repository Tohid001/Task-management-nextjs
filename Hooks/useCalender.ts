import React, { useState, useEffect } from "react";
import moment from "moment";

function useCalender() {
  const [value, setValue] = useState(moment());
  const [calender, setCalender] = useState([]);

  const previousMonth = () => {
    setValue((prev) => {
      return prev.clone().subtract(1, "month");
    });
  };

  const nextMonth = () => {
    setValue((prev) => {
      return prev.clone().add(1, "month");
    });
  };

  useEffect(() => {
    // console.log("useeffect");

    const startDay = value.clone().startOf("month");
    const endDay = value.clone().endOf("month");
    const day = startDay.clone().subtract(1, "day");

    const tempCalender = [];

    while (
      (!day.isSame(endDay, "day") && day.isSame(endDay, "month")) ||
      day.isBefore(endDay, "month")
    ) {
      tempCalender.push(day.add(1, "day").clone());
    }
    // console.log("tempCalender", tempCalender);
    setCalender(tempCalender);
  }, [value]);
  // console.log("hook", calender);

  return [value, setValue, calender, previousMonth, nextMonth];
}

export default useCalender;
