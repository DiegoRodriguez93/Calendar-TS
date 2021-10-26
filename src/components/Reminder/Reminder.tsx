import { useState } from 'react';
import { Box, ClickAwayListener, Typography } from '@material-ui/core';
import { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';

import { RemindersType, ReminderType } from '../../types/app';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  deleteReminder,
  setEditMode,
  setReminderToEdit,
  toogleModal,
} from '../../redux/reminderSlice';
import { ReminderFloatingBox } from './ReminderFloatingBox';

type ReminderProps = {
  reminders?: RemindersType['reminders'];
  actualDate: string;
};

const useStyles = makeStyles({
  titleContainer: {
    display: 'block',
    borderRadius: '8px',
    padding: '1px',
  },
  reminderContainer: {
    display: 'flex',
    gap: '2px',
    flexDirection: 'column',
    cursor: 'pointer',
  },
});

export const Reminder: FC<ReminderProps> = ({ reminders, actualDate }) => {
  const [openId, setOpenId] = useState('');
  const allReminders = reminders?.[actualDate];
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleClickAway = () => {
    setOpenId('');
  };

  const handleDelete = (id: string, date: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReminder({ id, date }));
        Swal.fire('Deleted!', 'Your reminder has been deleted.', 'success');
      }
    });
  };

  const handleEdit = (reminder: ReminderType) => {
    dispatch(setReminderToEdit(reminder));
    dispatch(setEditMode());
    dispatch(toogleModal());
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={classes.reminderContainer}>
        {allReminders &&
          allReminders.map((reminder) => (
            <Box key={reminder.id}>
              <Typography
                style={{
                  backgroundColor: reminder.color,
                }}
                className={classes.titleContainer}
                component="span"
                onMouseOver={() => setOpenId(reminder.id)}
                key={reminder.id}
              >
                {reminder.title}
                {openId === reminder.id && (
                  <ReminderFloatingBox
                    reminder={reminder}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                )}
              </Typography>
            </Box>
          ))}
      </Box>
    </ClickAwayListener>
  );
};
