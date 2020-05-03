import React from 'react';
import { OpeningHoursInterface } from '../../../views/types/types';

export type HandleChangeOpenType = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;

export interface FormOpenCloseButtonProps {
  row: OpeningHoursInterface,
  onClick: HandleChangeOpenType
}
