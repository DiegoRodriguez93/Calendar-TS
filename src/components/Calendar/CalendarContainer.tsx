import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  makeStyles,
} from '@material-ui/core';

import { daysOptions } from '../../utils/utils';
import { CalendarDays } from './CalendarDays';

const useStyles = makeStyles({
  table: {
    minHeight: '80vh',
    borderCollapse: 'inherit',
    borderSpacing: 1,
  },
});

export const CalendarContainer = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="calendar">
        <TableHead>
          <TableRow>
            {daysOptions.map((day) => (
              <TableCell key={day} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <CalendarDays />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
