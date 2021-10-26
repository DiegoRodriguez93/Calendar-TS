import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMonth, getYear } from 'date-fns';
import { assign } from 'lodash';

import { CurrentlyDate } from '../types/app';
import { RootState } from './store';

const today = new Date();

const initialState: CurrentlyDate = {
  monthIndex: getMonth(today),
  year: getYear(today),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    increment: (state) => {
      state.monthIndex === 11
        ? assign(state, { monthIndex: 0, year: (state.year += 1) })
        : (state.monthIndex += 1);
    },
    decrement: (state) => {
      state.monthIndex === 0
        ? assign(state, { monthIndex: 11, year: (state.year -= 1) })
        : (state.monthIndex -= 1);
    },
    changeToSpecificMonth: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload;
    },
    changeToSpecificYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  changeToSpecificMonth,
  changeToSpecificYear,
} = calendarSlice.actions;

export const selectedMonth = (state: RootState) => state.calendar.monthIndex;
export const selectedYear = (state: RootState) => state.calendar.year;

export default calendarSlice.reducer;
