import { render, screen } from '@testing-library/react';
import Site from './Site';

test('renders learn react link', () => {
  render(<ASitepp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
