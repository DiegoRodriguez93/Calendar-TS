import { FC } from 'react';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { AccessTime, AddAlert, Delete, Edit, Event } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';

import { ReminderType } from '../../types/app';
import { timeZone } from '../../utils/utils';

const useStyles = makeStyles({
  actionIcon: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.4,
    },
  },
  floatingBoxContainer: {
    backgroundColor: '#f0eded',
    position: 'absolute',
    border: '1px solid grey',
    borderRadius: '15px',
    maxWidth: '360px',
    zIndex: 2,
  },
  actionsButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
    gap: '15px',
  },
  createdText: { fontSize: '0.75rem', margin: '0 10px 0 10px' },
});

type ReminderFloatingBoxProps = {
  reminder: ReminderType;
  handleEdit: (reminder: ReminderType) => void;
  handleDelete: (id: string, date: string) => void;
};

export const ReminderFloatingBox: FC<ReminderFloatingBoxProps> = ({
  reminder,
  handleEdit,
  handleDelete,
}) => {
  const classes = useStyles();
  const { id, title, date, time, creation_date } = reminder;
  return (
    <Box className={classes.floatingBoxContainer}>
      <Box className={classes.actionsButtonsContainer}>
        <Edit
          onClick={() => handleEdit(reminder)}
          className={classes.actionIcon}
          color="primary"
        />
        <Delete
          onClick={() => handleDelete(id, date)}
          className={classes.actionIcon}
          color="error"
        />
      </Box>

      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AddAlert />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Title" secondary={title} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Event />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Date"
            secondary={format(new Date(`${date} ${timeZone}`), 'd MMM yyyy')}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Time" secondary={time.slice(0, -3)} />
        </ListItem>
      </List>
      <Divider />
      <Typography className={classes.createdText} color="textSecondary">
        created : {format(new Date(creation_date), 'd MMM yyyy, HH:mm')}
      </Typography>
    </Box>
  );
};
