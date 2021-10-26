import { FormControl, Select, Typography } from '@material-ui/core';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';

import { monthsOptions, yearsOptions } from '../../utils/utils';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  changeToSpecificMonth,
  changeToSpecificYear,
  selectedMonth,
  selectedYear,
} from '../../redux/calendarSlice';

export const JumpToSelectors = () => {
  const dispatch = useAppDispatch();
  const month = useAppSelector(selectedMonth);
  const year = useAppSelector(selectedYear);

  const handleChangeMonth = (event: ChangeEvent<{ value: unknown }>) => {
    dispatch(changeToSpecificMonth(Number(event.target.value)));
  };

  const handleChangeYear = (event: ChangeEvent<{ value: unknown }>) => {
    dispatch(changeToSpecificYear(Number(event.target.value)));
  };
  return (
    <>
      <Typography
        style={{ fontSize: '1.25rem', margin: 'auto 0px auto 10%' }}
        variant="subtitle1"
        component="span"
      >
        Jump to:
      </Typography>
      <FormControl>
        <Select
          native
          variant="outlined"
          id="month-selector"
          value={month}
          onChange={handleChangeMonth}
        >
          {monthsOptions.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <Select
          native
          variant="outlined"
          id="year-selector"
          value={year}
          onChange={handleChangeYear}
        >
          {yearsOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
