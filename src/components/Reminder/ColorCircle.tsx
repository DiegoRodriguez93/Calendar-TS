import { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import { CircleColorType } from '../../types/enums';

type ColorCircleProps = {
  color: string;
  type: CircleColorType;
  onClick?: () => void;
};

const useStyles = makeStyles({
  circlePicker: {
    display: 'flex',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '10px',
  },
  circleRecently: {
    display: 'flex',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '10px',
  },
});

export const ColorCircle: FC<ColorCircleProps> = ({
  color,
  type,
  onClick = () => {},
}) => {
  const classes = useStyles();

  return (
    <Box
      className={
        type === CircleColorType.PICKER
          ? classes.circlePicker
          : classes.circleRecently
      }
      onClick={onClick}
      style={{ backgroundColor: color }}
    ></Box>
  );
};
