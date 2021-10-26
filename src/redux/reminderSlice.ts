import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

import { DeletePayloadType, RemindersType, ReminderType } from '../types/app';
import { sortReminderByTime } from '../utils/utils';
import { RootState } from './store';

const initialState: RemindersType = {
  reminders: {},
  isOpenReminderFormModal: false,
  isEditMode: false,
  reminderToEdit: {} as ReminderType,
  recentlyUsedColors: [],
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    addReminder: (state, { payload }: PayloadAction<ReminderType>) => {
      if (state.reminders[payload.date]) {
        state.reminders[payload.date] = [
          ...state.reminders[payload.date],
          payload,
        ];
        state.reminders[payload.date] = sortReminderByTime(
          state.reminders[payload.date],
        );
      } else {
        state.reminders[payload.date] = [payload];
      }
      !state.recentlyUsedColors.includes(payload.color) &&
        state.recentlyUsedColors.push(payload.color);
    },
    editReminder: (state, { payload }: PayloadAction<ReminderType>) => {
      const currentState = current(state);
      Object.keys(currentState.reminders).map(
        (reminderDay) =>
          (state.reminders[reminderDay] = currentState.reminders[
            reminderDay
          ].filter(({ id }) => id !== payload.id)),
      );
      if (!isEmpty(state.reminders[payload.date])) {
        state.reminders[payload.date] = [
          ...state.reminders[payload.date],
          payload,
        ];
        state.reminders[payload.date] = sortReminderByTime(
          state.reminders[payload.date],
        );
      } else {
        state.reminders[payload.date] = [payload];
      }
      !state.recentlyUsedColors.includes(payload.color) &&
        state.recentlyUsedColors.push(payload.color);
    },
    deleteReminder: (state, action: PayloadAction<DeletePayloadType>) => {
      state.reminders[action.payload.date] = state.reminders[
        action.payload.date
      ].filter(({ id }) => id !== action.payload.id);
    },
    toogleModal: (state) => {
      state.isOpenReminderFormModal = !state.isOpenReminderFormModal;
      if (state.isEditMode && !state.isOpenReminderFormModal)
        state.isEditMode = false;
    },
    setEditMode: (state) => {
      state.isEditMode = true;
    },
    setReminderToEdit: (state, action: PayloadAction<ReminderType>) => {
      state.reminderToEdit = action.payload;
    },
  },
});

export const {
  addReminder,
  editReminder,
  deleteReminder,
  toogleModal,
  setEditMode,
  setReminderToEdit,
} = reminderSlice.actions;

export const selectReminders = (state: RootState) => {
  /* console.log(state.reminder.reminders); */
  return state.reminder.reminders;
};

export const isOpenModal = (state: RootState) =>
  state.reminder.isOpenReminderFormModal;
export const isEditMode = (state: RootState) => state.reminder.isEditMode;
export const getReminderToEdit = (state: RootState) =>
  state.reminder.reminderToEdit;
export const getRecentlyUsedColor = (state: RootState) =>
  state.reminder.recentlyUsedColors;

export default reminderSlice.reducer;
