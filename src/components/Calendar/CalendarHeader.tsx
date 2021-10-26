import { Box, Button, Grid, makeStyles } from '@material-ui/core';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  decrement,
  increment,
  selectedMonth,
  selectedYear,
} from '../../redux/calendarSlice';
import { monthsOptions } from '../../utils/utils';

const useStyles = makeStyles({
  headerContainer: {
    textAlign: 'center',
  },
});

export const CalendarHeader = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const month = useAppSelector(selectedMonth);
  const year = useAppSelector(selectedYear);

  return (
    <header>
      <Box className={classes.headerContainer} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(decrement())}
            >
              {'<'}
            </Button>
          </Grid>
          <Grid item xs={4}>
            {monthsOptions[month]} {year}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(increment())}
            >
              {'>'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};
