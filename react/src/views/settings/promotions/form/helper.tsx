import { MenuItem } from '@material-ui/core';
import React from 'react';
import { weekDaysString } from '../../../../utils/common/weekDaysString';

export const dayOptions = [...weekDaysString, 'everyDay'];

export const getDayOptions = dayOptions.map((day, index) => (
  <MenuItem key={day} value={index}>
    {day}
  </MenuItem>
));
