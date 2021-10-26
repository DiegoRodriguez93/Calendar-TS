import { isEmpty } from 'lodash';
import { RemindersType, ReminderType } from '../types/app';
import reminderReducer, {
  addReminder,
  editReminder,
  deleteReminder,
} from './reminderSlice';

describe('reminder reducer', () => {
  const initialState: RemindersType = {
    reminders: {},
    isOpenReminderFormModal: false,
    isEditMode: false,
    reminderToEdit: {} as ReminderType,
    recentlyUsedColors: [],
  };

  const reminderMock: ReminderType = {
    id: '12345',
    title: 'Reminder mock',
    date: '2021-10-25',
    time: '18:10:10',
    color: '#007bff',
    creation_date: 'Mon Oct 25 2021 15:15:03 GMT-0300 (Uruguay Standard Time)',
  };

  const initialStateFilled: RemindersType = {
    reminders: { [reminderMock.date]: [{ ...reminderMock }] },
    isOpenReminderFormModal: false,
    isEditMode: false,
    reminderToEdit: {} as ReminderType,
    recentlyUsedColors: [],
  };

  const reminderMockEdit: ReminderType = {
    ...reminderMock,
    title: 'Edited title',
  };

  it('should handle addReminder', () => {
    const actual = reminderReducer(initialState, addReminder(reminderMock));
    expect(actual.reminders[reminderMock.date][0]).toEqual(reminderMock);
  });

  it('should handle editReminder', () => {
    const actual = reminderReducer(
      initialState,
      editReminder(reminderMockEdit),
    );
    expect(actual.reminders[reminderMock.date][0]).toEqual(reminderMockEdit);
  });

  it('should handle deleteReminder', () => {
    const actual = reminderReducer(
      initialStateFilled,
      deleteReminder({ id: reminderMock.id, date: reminderMock.date }),
    );
    expect(isEmpty(actual.reminders[reminderMock.date][0])).toEqual(true);
  });
});
