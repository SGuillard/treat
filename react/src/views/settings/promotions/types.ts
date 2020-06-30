import { PromotionInterface } from '../../types/types';
import { ComponentType, FC, ReactNode } from 'react';

export type TablePromotionInterface = Omit<PromotionInterface, 'day' | 'isActive'> & { day: string, status: ReactNode, serviceName?: string };
