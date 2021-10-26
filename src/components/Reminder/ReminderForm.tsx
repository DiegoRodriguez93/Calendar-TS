import { useState, FC } from 'react';
import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ColorPicker from 'material-ui-color-picker';
import { nanoid } from 'nanoid';
import { format, isValid } from 'date-fns';
import Swal from 'sweetalert2';

import {
  addReminder,
  editReminder,
  getRecentlyUsedColor,
  toogleModal,
} from '../../redux/reminderSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ReminderType } from '../../types/app';
import { timeZone } from '../../utils/utils';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ColorCircle } from './ColorCircle';
import { CircleColorType } from '../../types/enums';

const useStyles = makeStyles({
  dateTimePicker: {
    width: '100%',
  },
  colorPicker: {
    '& input': {
      display: 'none',
    },
  },
  saveReminderButton: {
    height: '45px',
    width: '180px',
    fontSize: '1em',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  selectReminderLabel: {
    display: 'flex',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  selecRecentlyContainer: {
    display: 'block',
    height: 'auto',
  },
  form: {
    marginTop: '1rem',
  },
  selectReminderContaier: {
    display: 'block',
    height: '100px',
  },
  recentlyColorsContainer: {
    display: 'flex',
    gap: '15px',
  },
});

type ReminderFormProps = {
  isEditMode: boolean;
  reminderToEdit: ReminderType;
};

export const ReminderForm: FC<ReminderFormProps> = ({
  isEditMode,
  reminderToEdit,
}) => {
  const now = new Date();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const recentlyColors = useAppSelector(getRecentlyUsedColor);

  const [title, setTitle] = useState(isEditMode ? reminderToEdit.title : '');
  const [date, setDate] = useState(
    isEditMode
      ? new Date(
          reminderToEdit.date ? `${reminderToEdit.date} ${timeZone}` : '',
        )
      : now,
  );
  const [time, setTime] = useState(
    isEditMode
      ? new Date(
          reminderToEdit.time
            ? `${format(now, 'yyyy-M-d')} ${reminderToEdit.time}`
            : '',
        )
      : now,
  );
  const [color, setColor] = useState(
    isEditMode ? reminderToEdit.color : '#007bff',
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid(date) || !isValid(time)) {
      return false;
    }

    const result: ReminderType = {
      id: isEditMode ? reminderToEdit?.id ?? '' : nanoid(),
      title,
      date: format(date, 'yyyy-M-d'),
      time: format(time, 'HH:mm:ii'),
      color,
      creation_date: new Date().toString(),
    };

    isEditMode ? dispatch(editReminder(result)) : dispatch(addReminder(result));
    dispatch(toogleModal());
    Swal.fire('Saved!', '', 'success');
  };

  const handleColor = (color: string) => {
    if (color) {
      setColor(color);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onInput={(e) =>
          (e.target as HTMLInputElement).value &&
          setTitle((e.target as HTMLInputElement).value)
        }
        inputProps={{ maxLength: 30 }}
        variant="outlined"
        required
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          className={classes.dateTimePicker}
          format="d MMM yyyy"
          inputVariant={'outlined'}
          required
          value={date}
          onChange={(newDate) => newDate && setDate(newDate)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time"
          className={classes.dateTimePicker}
          value={time}
          required
          inputVariant={'outlined'}
          onChange={(newTime) => newTime && setTime(newTime)}
          keyboardIcon={<AccessTimeIcon />}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>

      <Box className={classes.selectReminderContaier}>
        <Typography
          variant="subtitle1"
          className={classes.selectReminderLabel}
          component="span"
          color="initial"
        >
          Select Reminder Color
        </Typography>
        <ColorPicker
          name="color"
          defaultValue={color}
          className={classes.colorPicker}
          label={<ColorCircle type={CircleColorType.PICKER} color={color} />}
          onChange={handleColor}
        />
      </Box>
      {recentlyColors.length > 0 && (
        <Box className={classes.selecRecentlyContainer}>
          <Typography
            variant="subtitle1"
            className={classes.selectReminderLabel}
            component="span"
            color="initial"
          >
            Recently used
          </Typography>
          <Box className={classes.recentlyColorsContainer}>
            {recentlyColors.map((recentlyColor) => (
              <ColorCircle
                onClick={() => setColor(recentlyColor)}
                type={CircleColorType.RECENTLY}
                color={recentlyColor}
              />
            ))}
          </Box>
        </Box>
      )}
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.saveReminderButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save Reminder
        </Button>
      </Box>
    </form>
  );
};
