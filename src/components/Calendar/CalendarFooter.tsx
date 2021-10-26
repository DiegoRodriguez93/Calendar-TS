import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AddReminderButton } from '../Reminder/AddReminderButton';
import { JumpToSelectors } from './JumpToSelectors';

const useStyles = makeStyles({
  footerContainer: {
    textAlign: 'center',
    flexGrow: 1,
    marginTop: '1rem',
  },
  leftContainer: {
    display: 'flex',
    gap: '30px',
    margin: '10px 0px 10px 0px',
  },
  rightContainer: {
    display: 'flex',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export const CalendarFooter = () => {
  const classes = useStyles();
  return (
    <footer>
      <Box className={classes.footerContainer}>
        <Grid container spacing={2}>
          <Grid className={classes.leftContainer} xs={12} md={6}>
            <JumpToSelectors />
          </Grid>
          <Grid item className={classes.rightContainer} xs={12} md={6}>
            <AddReminderButton />
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};
