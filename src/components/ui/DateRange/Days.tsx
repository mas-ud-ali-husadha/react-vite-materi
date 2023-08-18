import * as React from "react";
import moment from "moment";

interface DaysProps {
  date: moment.Moment;
  startDate: moment.Moment | string | null;
  endDate: moment.Moment | string | null;
  onClick: (date: moment.Moment) => void;
  past?: boolean | null;
}

const Days: React.FC<DaysProps> = ({
  date,
  startDate,
  endDate,
  onClick,
  past = false,
}) => {
  const isPast = moment().subtract(1, "day").isAfter(date);

  const className: string[] = [];

  if (moment().isSame(date, "day")) {
    className.push("active");
  }

  if (date.isSame(startDate, "day")) {
    className.push("start");
  }

  if (date.isSame(startDate, "day") && endDate === null) {
    className.push("start", "end");
  }

  if (date.isBetween(startDate, endDate, "day")) {
    className.push("between");
  }

  if (date.isSame(endDate, "day")) {
    className.push("end");
  }

  if (past && isPast) {
    className.push("muted");
  }

  return (
    <td
      onClick={() => onClick(date)}
      className={className.join(" ") + "  text-center font-medium py-1 px-2 cursor-pointer"}
    >
      <div className="m-auto">{date.date() || ""}</div>
    </td>
  );
};

export default Days;
