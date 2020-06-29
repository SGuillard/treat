import { PromotionInterface } from '../../types/types';

export type TablePromotionInterface = Omit<PromotionInterface, 'day' | 'isActive'> & { day: string, status: boolean, serviceName?: string };
