import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { adminUsersReducer } from '../store/reducers/adminUsersReducer';
import { promotionReducer } from '../store/reducers/promotionReducer';

const mockStore = [
  {
    AdminUsers: {
      list: [],
    },
  },
  {
    Global: {
      list: [],
    },
  },
  {
    Service: {
      list: [],
    },
  },
  {
    Appointment: {
      list: [],
    },
  },
  {
    OpeningHours: {
      list: [],
    },
  },
  {
    promotions: {
      list: [],
    },
  },
];

function renderWithRedux(
  ui,
  {
    initialState = { promotions: { list: [] } },
    store = createStore(promotionReducer, initialState),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

// override render method
export { renderWithRedux };
