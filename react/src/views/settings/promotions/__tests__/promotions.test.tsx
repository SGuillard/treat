import React from 'react';
import { renderWithRedux, screen } from '../../../../tests/utils';
import Promotions from '../promotions';
import '@testing-library/jest-dom';

describe('PromotionsComponent', () => {
  test('shows the children when the checkbox is checked', () => {
    renderWithRedux(<Promotions />);
    expect(screen.getByText('Active promotions')).toBeInTheDocument();
  });
});
