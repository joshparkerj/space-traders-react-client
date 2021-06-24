import React from 'react';
import { render, screen } from '@testing-library/react';
import Client from './Client';

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(React.createElement(Client));
  const linkElement = screen.getByText(/learn react/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
