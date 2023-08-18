import moment, { Moment } from "moment";
import { useState, useEffect, useMemo, Fragment } from "react";
import Days from "./Days";
import { Input } from "..";
import { Popover, Transition } from "@headlessui/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import TableDate from "./Table";
import { Button } from "..";

interface DateRangeType {
  start: Moment | null | string;
  end: Moment | null | string;
  onChange: (arg: any) => void;
}

interface DateType {
  firstDate: Moment | null;
  secondDate: Moment | null;
}

interface ReturnType {
  startDate: Moment | null | string;
  endDate: Moment | null | string;
}

const DateRange = ({ start, end, onChange }: DateRangeType) => {
  const [{ startDate, endDate }, setReturnValue] = useState<ReturnType>({
    startDate: null,
    endDate: null,
  });

  const [date, setDate] = useState<DateType>({
    firstDate: null,
    secondDate: null,
  });

  const onClose = () => {
    setReturnValue({
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    const firstDate = moment();
    const secondDate = moment(firstDate).add(1, "M");

    setDate({ firstDate, secondDate });
  }, []);

  const onApply = () => {
    onChange([startDate, endDate]);
  };

  const handleChange = (date: Moment) => {
    const s = moment(startDate).format("YYYY-MM-DD");
    const d = moment(date).format("YYYY-MM-DD");

    if (startDate !== null && endDate !== null) {
      setReturnValue({
        startDate: null,
        endDate: null,
      });
    }
    if (startDate === null || date.isBefore(startDate, "day")) {
      setReturnValue({
        startDate: d,
        endDate: null,
      });
    } else if (startDate !== null && endDate !== null) {
      setReturnValue({
        startDate: d,
        endDate: null,
      });
    } else if (date.isSame(startDate, "day") && date.isSame(endDate, "day")) {
      setReturnValue({
        startDate: null,
        endDate: null,
      });
    } else if (date.isAfter(startDate, "day")) {
      setReturnValue({
        startDate: s,
        endDate: d,
      });
    }
  };

  const firstPrevious = () => {
    const newDate = moment(date.firstDate).subtract(1, "M");

    setDate({ ...date, firstDate: newDate });
  };

  const firstNext = () => {
    const newDate = moment(date.firstDate).add(1, "M");
    if (moment(date.secondDate).isSame(newDate, "month")) {
      console.log("o1");
      return setDate({
        ...date,
        firstDate: newDate,
        secondDate: moment(date.secondDate).add(1, "M"),
      });
    }

    setDate({ ...date, firstDate: newDate });
  };

  const secondPrevious = () => {
    const newDate = moment(date.secondDate).subtract(1, "M");
    if (moment(date.firstDate).isSame(newDate, "month")) {
      console.log("o2");
      return setDate({
        ...date,
        firstDate: moment(date.firstDate).subtract(1, "M"),
        secondDate: newDate,
      });
    }
    setDate({ ...date, secondDate: newDate });
  };

  const secondNext = () => {
    const newDate = moment(date.secondDate).add(1, "M");
    setDate({ ...date, secondDate: newDate });
  };

  const firstDayDate = useMemo(() => {
    const firstDay = moment(date.firstDate).startOf("month");

    return firstDay;
  }, [date.firstDate]);

  const firstDays = useMemo(() => {
    const map = [];
    const daysInMonth = moment(date.firstDate).daysInMonth();
    const previousMonth = moment(date.firstDate).subtract(1, "month");
    const previousMonthDays = previousMonth.daysInMonth();
    const nextsMonth = moment(date.firstDate).add(1, "month");

    for (let i = firstDayDate.day(); i > 0; i--) {
      previousMonth.date(previousMonthDays - i + 1);

      map.push(
        <td className="text-center text-gray-400 py-1 px-2">
          {moment(previousMonth).format("D")}
        </td>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const showDate = moment(date.firstDate).date(i);
      map.push(
        <Days
          date={showDate}
          startDate={startDate}
          endDate={endDate}
          onClick={(date) => handleChange(date)}
        />
      );
    }

    const daysCount = map.length;
    for (let i = 1; i <= 42 - daysCount; i++) {
      nextsMonth.date(i);
      map.push(
        <td className="text-center text-gray-400 py-1 px-2">
          {moment(nextsMonth).format("D")}
        </td>
      );
    }

    const list = [];

    for (let i = 0; i < map.concat().length; i += 7) {
      const slicIt = map.concat().slice(i, i + 7);
      list.push(slicIt);
    }

    return list;
  }, [firstDayDate, startDate, endDate]);

  const secondDayDate = useMemo(() => {
    const secondDay = moment(date.secondDate).startOf("month");

    return secondDay;
  }, [date.secondDate]);

  const secondDays = useMemo(() => {
    const map = [];
    const daysInMonth = moment(date.secondDate).daysInMonth();
    const previousMonth = moment(date.secondDate).subtract(1, "month");
    const previousMonthDays = previousMonth.daysInMonth();
    const nextsMonth = moment(date.secondDate).add(1, "month");

    for (let i = secondDayDate.day(); i > 0; i--) {
      previousMonth.date(previousMonthDays - i + 1);

      map.push(
        <td className="text-center text-gray-400 py-1 px-2">
          {moment(previousMonth).format("D")}
        </td>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const showDate = moment(date.secondDate).date(i);
      map.push(
        <Days
          date={showDate}
          startDate={startDate}
          endDate={endDate}
          onClick={(date) => handleChange(date)}
        />
      );
    }

    const daysCount = map.length;
    for (let i = 1; i <= 42 - daysCount; i++) {
      nextsMonth.date(i);
      map.push(
        <td className="text-center text-gray-400 py-1 px-2">
          {moment(nextsMonth).format("D")}
        </td>
      );
    }

    const list = [];

    for (let i = 0; i < map.concat().length; i += 7) {
      const slicIt = map.concat().slice(i, i + 7);
      list.push(slicIt);
    }

    return list;
  }, [secondDayDate, startDate, endDate]);

  const inputValue = useMemo(() => {
    if (start && end) {
      return `${moment(start).format("DD MMMM YYYY")} - ${moment(end).format(
        "DD MMMM YYYY"
      )}`;
    }
    return "";
  }, [start, end]);

  return (
    <Popover className="relative">
      <Popover.Button className={"outline-none"}>
        <Input value={inputValue} className="min-w-[300px] text-sm" readOnly />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 bg-white py-4 px-3 mt-2 flex flex-col gap-5 border rounded-md shadow">
          {({ close }) => (
            <>
              <div className="flex gap-10">
                <div className="flex flex-col min-w-[230px]">
                  <div className="flex justify-between items-center text-sm mb-3 cursor-pointer">
                    <BiChevronLeft
                      size="2em"
                      onClick={() => {
                        firstPrevious();
                      }}
                    />
                    <div className="flex gap-1  font-medium">
                      <span>{date?.firstDate?.format("MMM")}</span>
                      <span>{date?.firstDate?.format("YYYY")}</span>
                    </div>
                    <BiChevronRight size="2em" onClick={firstNext} />
                  </div>
                  <TableDate days={firstDays} />
                </div>
                <div className="flex flex-col min-w-[230px]">
                  <div className="flex justify-between items-center text-sm mb-3 cursor-pointer">
                    <BiChevronLeft
                      size="2em"
                      onClick={() => {
                        secondPrevious();
                      }}
                    />
                    <div className="flex gap-1  font-medium">
                      <span>{date?.secondDate?.format("MMM")}</span>
                      <span>{date?.secondDate?.format("YYYY")}</span>
                    </div>
                    <BiChevronRight size="2em" onClick={secondNext} />
                  </div>
                  <TableDate days={secondDays} />
                </div>
              </div>

              <div className="flex text-semibold text-xs ml-auto items-center">
                <span>{inputValue}</span>
                <Button
                  text="Cancel"
                  variant="default"
                  onClick={() => {
                    onClose();
                    close();
                  }}
                />
                <Button
                  text="Apply"
                  variant="primary-border"
                  onClick={onApply}
                />
              </div>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DateRange;
