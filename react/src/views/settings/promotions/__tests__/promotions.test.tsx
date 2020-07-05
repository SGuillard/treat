import React from 'react';
import { renderWithRedux, screen } from '../../../../tests/utils';
import '@testing-library/jest-dom';
import { PromotionList } from '../promotion-list';

describe('PromotionsComponent', () => {
  test('shows the children when the checkbox is checked', () => {
    renderWithRedux(<PromotionList />);
    expect(screen.getByText('Active promotions')).toBeInTheDocument();
  });
});
