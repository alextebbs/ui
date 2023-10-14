import { cn } from "~/utils/cn";

import dayjs from "dayjs";

import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { useState } from "react";
import { nanoid } from "nanoid";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

interface CalendarProps {
  /**
   * The date to display.
   */
  date?: dayjs.Dayjs | Date;
}

/**
 * Calendar view
 */
export const Calendar = (props: CalendarProps) => {
  const { date = dayjs() } = props;

  const getNumberOfDaysInMonth = (year: string, month: string) => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  };

  const createDaysForCurrentMonth = (year: string, month: string) => {
    return [...(Array(getNumberOfDaysInMonth(year, month)) as undefined[])].map(
      (day, index) => {
        return {
          date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: true,
        };
      }
    );
  };

  const createDaysForPreviousMonth = (year: string, month: string) => {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0]?.date);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0]?.date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

    return [
      ...(Array(visibleNumberOfDaysFromPreviousMonth) as undefined[]),
    ].map((_, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false,
      };
    });
  };

  const createDaysForNextMonth = (year: string, month: string) => {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...(Array(visibleNumberOfDaysFromNextMonth) as undefined[])].map(
      (_, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
        };
      }
    );
  };

  const getWeekday = (date: string | undefined) => {
    return dayjs(date).weekday();
  };

  const [dateState, setDateState] = useState(date);

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const year = dayjs(dateState).format("YYYY");
  const month = dayjs(dateState).format("M");

  const currentMonthDays = createDaysForCurrentMonth(year, month);
  const previousMonthDays = createDaysForPreviousMonth(year, month);
  const nextMonthDays = createDaysForNextMonth(year, month);
  const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  return (
    <div className="rounded-md border border-neutral-400">
      <div className="flex justify-between p-1 text-center text-sm uppercase tracking-[0.15em] text-neutral-400">
        <button
          className="rounded-sm border border-transparent p-2 px-3 hover:border-primary-500 hover:bg-primary-500/20 hover:text-primary-500"
          onClick={() => setDateState(dayjs(dateState).subtract(1, "month"))}
        >
          <BsChevronLeft />
        </button>
        <div className="p-2">
          {dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
        </div>
        <button
          className="rounded-sm border border-transparent p-2 px-3 hover:border-primary-500 hover:bg-primary-500/20 hover:text-primary-500"
          onClick={() => setDateState(dayjs(dateState).add(1, "month"))}
        >
          <BsChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 border-y border-neutral-400 px-2">
        {WEEKDAYS.map((day) => (
          <div
            key={nanoid()}
            className={cn(
              `flex items-center justify-center p-3 py-1.5 text-xs uppercase text-neutral-400`
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 p-2 dark:text-white">
        {days.map((day) => {
          const isToday = day.date == dayjs().format("YYYY-MM-DD");

          return (
            <div
              key={nanoid()}
              className={cn(
                `flex items-center justify-center rounded-sm border border-transparent p-3 text-sm`,
                !day.isCurrentMonth && `text-neutral-400 dark:text-neutral-600`,
                day.isCurrentMonth &&
                  `hover:border-primary-500 hover:bg-primary-500/20 hover:text-primary-500`
              )}
            >
              <span
                className={cn(
                  isToday && `border-b border-primary-500 text-primary-500`
                )}
              >
                {dayjs(`${day.date}`).format("DD")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
