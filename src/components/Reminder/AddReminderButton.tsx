import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toogleModal } from '../../redux/reminderSlice';

const useStyles = makeStyles({
  buttonReminder: { height: '60px', margin: 'auto 10% auto 0' },
});

export const AddReminderButton = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const handleOpenModal = () => {
    dispatch(toogleModal());
  };

  return (
    <Button
      className={classes.buttonReminder}
      variant="contained"
      color="primary"
      onClick={handleOpenModal}
    >
      + Add Reminder
    </Button>
  );
};
