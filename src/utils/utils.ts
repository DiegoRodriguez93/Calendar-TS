import { addYears, subYears, getYear } from 'date-fns';
import { ReminderType } from '../types/app';

export const MIN_YEAR = getYear(subYears(new Date(), 50));
export const MAX_YEAR = getYear(addYears(new Date(), 50));

export const yearsOptions = Array(MAX_YEAR - MIN_YEAR)
  .fill(1)
  .map((_, idx) => MIN_YEAR + idx);

export const monthsOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const daysOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const sortReminderByTime = (reminders: Array<ReminderType>) =>
  reminders.sort((a, b) => a.time.localeCompare(b.time));

export const timeZone = new Date().toString().substring(15);
