import { MenuItem } from '@material-ui/core';
import React from 'react';
import { weekDaysString } from '../../../../utils/common/weekDaysString';

const dayOptions = [...weekDaysString, 'everyDay'];

export const getDayOptions = dayOptions.map((day: string) => (
  <MenuItem key={day} value={day}>
    {day}
  </MenuItem>
));
