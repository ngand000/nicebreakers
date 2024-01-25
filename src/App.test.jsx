import { render, screen } from '@testing-library/react';
import App from './App';

test('header exists', () => {
  render(<App />);
  const linkElement = screen.getByText(/Website wide header/i);
  expect(linkElement).toBeInTheDocument();
});
