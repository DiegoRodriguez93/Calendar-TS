import { configureStore } from '@reduxjs/toolkit';

import calendarReducer from './calendarSlice';
import reminderReducer from './reminderSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    reminder: reminderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
