import { Box, Modal, Typography, makeStyles } from '@material-ui/core';

import {
  getReminderToEdit,
  isEditMode,
  isOpenModal,
  toogleModal,
} from '../../redux/reminderSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ReminderForm } from './ReminderForm';

const useStyles = makeStyles({
  boxContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    backgroundColor: '#FFF',
    border: '1px solid #707070',
    borderRadius: '15px',
    boxShadow: '24',
    padding: '2rem',
  },
});

export const AddReminderModal = () => {
  const classes = useStyles();
  const open = useAppSelector(isOpenModal);
  const editMode = useAppSelector(isEditMode);
  const reminderToEdit = useAppSelector(getReminderToEdit);
  const dispatch = useAppDispatch();

  const title = editMode ? 'Edit reminder' : 'Add new reminder';

  return (
    <Modal open={open} onClose={() => dispatch(toogleModal())}>
      <Box className={classes.boxContainer}>
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
        <ReminderForm isEditMode={editMode} reminderToEdit={reminderToEdit} />
      </Box>
    </Modal>
  );
};
