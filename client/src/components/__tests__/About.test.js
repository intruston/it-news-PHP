import { render } from '@testing-library/react';
import About from '../About';

describe('About', () => {
  test('should render the component without errors', () => {
    const { getByText } = render(<About />);
    expect(getByText('Hello, and welcome to my React.js project!')).toBeInTheDocument();
  });
});