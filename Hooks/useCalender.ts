import { useState, useEffect } from "react";
import moment, { Moment } from "moment";

function useCalender() {
  const [value, setValue] = useState<Moment>(moment());
  const [calender, setCalender] = useState<Moment[]>([]);

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
    const startDay = value.clone().startOf("month");
    const endDay = value.clone().endOf("month");
    const day = startDay.clone().subtract(1, "day");

    const tempCalender: Moment[] = [];

    while (
      (!day.isSame(endDay, "day") && day.isSame(endDay, "month")) ||
      day.isBefore(endDay, "month")
    ) {
      tempCalender.push(day.add(1, "day").clone());
    }

    setCalender(tempCalender);
  }, [value]);

  return {
    value,
    setValue,
    calender,
    setCalender,
    previousMonth,
    nextMonth,
  };
}

export default useCalender;
