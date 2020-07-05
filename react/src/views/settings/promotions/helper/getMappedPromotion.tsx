import React from 'react';
import { PromotionInterface } from '../../../types/types';
import { TablePromotionInterface } from '../types';
import { dayOptions } from '../form/helper';
import { PromotionSwitcher } from '../promotion-switcher';

export const getMappedPromotion = (promotionList: PromotionInterface[]) => promotionList.map((promotion: PromotionInterface) => {
  const promotionTable = {} as TablePromotionInterface;
  promotionTable.serviceName = promotion.service.name;
  promotionTable.day = dayOptions[promotion.day];
  promotionTable.discount = `${promotion.discount}%`;
  promotionTable.status = <PromotionSwitcher promotion={promotion} />;
  return { ...promotion, ...promotionTable };
});
