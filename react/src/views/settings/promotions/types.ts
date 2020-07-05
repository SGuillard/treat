import { ReactElement, ReactNode } from 'react';
import { PromotionInterface } from '../../types/types';
import { ErrorObjectInterface } from '../../../utils/api/type';

export type TablePromotionInterface = Omit<PromotionInterface, 'discount' | 'day' | 'isActive'> & { day: string, status: ReactNode, discount: string, serviceName?: string };

export interface ErrorWrapperHOCProps<T> {
  children: ReactElement;
  errors: ErrorObjectInterface[];
}
