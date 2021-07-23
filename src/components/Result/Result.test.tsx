import Result from './Result';
import { render, screen } from '@testing-library/react';

describe('Result component', () => {
  test('renders no item', () => {
    // Arrange
    render(<Result items={[]} />);

    // Assert
    const listElement = screen.queryByRole('list');
    const headingElement = screen.getByText('No Result found', { exact: false });

    expect(headingElement).toBeInTheDocument();
    expect(listElement).toBeNull();
  });
});
