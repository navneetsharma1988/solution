import React from 'react';
import { render, screen } from '@testing-library/react';
import Result from './Result';
import { Fx } from '../../models/currency.model';


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mock-currencyItemComponent': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const mockCurrencyItemComponent = jest.fn();
jest.mock('../CurrencyItem/CurrencyItem', () => (props: { item: Fx }) => {
  mockCurrencyItemComponent(props);
  return <mock-currencyItemComponent />;
});

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

  test('renders CurrencyItem component with item', () => {
    // Arrange
    render(<Result items={[{ currency: 'USD' } as Fx]} />);

    // Assert
    const listElement = screen.queryByRole('list');

    expect(listElement).toBeInTheDocument();
    expect(mockCurrencyItemComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        item: expect.objectContaining({
          currency: 'USD'
        })
      })
    );
  });
});
