import { TableCell, TableRow, makeStyles, Typography } from '@material-ui/core';
import { getDay, getDaysInMonth, getWeeksInMonth } from 'date-fns';
import format from 'date-fns/format';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectedMonth, selectedYear } from '../../redux/calendarSlice';
import { selectReminders } from '../../redux/reminderSlice';
import { Reminder } from '../Reminder/Reminder';

const useStyles = makeStyles({
  dayCell: {
    width: '150px',
    height: '100px',
    border: '1px solid rgba(224, 224, 224, 1)',
    boxSizing: 'border-box',
  },
  diabledCell: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export const CalendarDays = () => {
  const classes = useStyles();
  const month = useAppSelector(selectedMonth);
  const year = useAppSelector(selectedYear);
  const reminders = useAppSelector(selectReminders);
  const today = format(new Date(), 'yyyy-MM-d');

  const allWeeks = Array.from(
    Array(getWeeksInMonth(new Date(year, month, 1))).keys(),
  );
  const allDays = [0, 1, 2, 3, 4, 5, 6];
  const firstDay = getDay(new Date(year, month, 1));
  let date = 1;

  return (
    <>
      {allWeeks.map((week) => (
        <TableRow key={week}>
          {allDays.map((day, idx) => {
            if (
              (week === 0 && day < firstDay) ||
              date > getDaysInMonth(new Date(year, month, 1))
            ) {
              return (
                <TableCell
                  className={`${classes.dayCell} ${classes.diabledCell}`}
                  key={idx}
                  align="center"
                ></TableCell>
              );
            } else {
              const actualDate = `${year}-${month + 1}-${date}`;
              date++;
              return (
                <TableCell className={classes.dayCell} key={idx} align="center">
                  {actualDate === today ? (
                    <Typography color="secondary" component="span">
                      {date - 1}
                    </Typography>
                  ) : (
                    <Typography component="span">{date - 1}</Typography>
                  )}
                  <Reminder reminders={reminders} actualDate={actualDate} />
                </TableCell>
              );
            }
          })}
        </TableRow>
      ))}
    </>
  );
};
