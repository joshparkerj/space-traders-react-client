import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Client from '../src/Client';

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(React.createElement(Client));
  const linkElement = screen.getByText(/Space Traders React Client/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
