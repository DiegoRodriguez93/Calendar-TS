import { getMonth, getYear } from 'date-fns';
import { CurrentlyDate } from '../types/app';
import calendarReducer, {
  increment,
  decrement,
  changeToSpecificMonth,
  changeToSpecificYear,
} from './calendarSlice';

const today = new Date();
const currentMonth = getMonth(today);
const currentYear = getYear(today);

describe('calendar reducer', () => {
  const initialState: CurrentlyDate = {
    monthIndex: currentMonth,
    year: currentYear,
  };

  it('should handle increment', () => {
    const actual = calendarReducer(initialState, increment());
    expect(actual.monthIndex).toEqual(
      initialState.monthIndex === 11 ? 0 : initialState.monthIndex + 1,
    );
  });

  it('should handle decrement', () => {
    const actual = calendarReducer(initialState, decrement());
    expect(actual.monthIndex).toEqual(
      initialState.monthIndex === 0 ? 11 : initialState.monthIndex - 1,
    );
  });

  it('should handle changeToSpecificMonth', () => {
    const actual = calendarReducer(initialState, changeToSpecificMonth(2));
    expect(actual.monthIndex).toEqual(2);
  });

  it('should handle changeToSpecificYear', () => {
    const actual = calendarReducer(initialState, changeToSpecificYear(1975));
    expect(actual.year).toEqual(1975);
  });
});
