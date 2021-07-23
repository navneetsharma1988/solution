import { Fx } from '../../models/currency.model';
import { render, screen } from "@testing-library/react";
import CurrencyItem from './CurrencyItem';

describe('CurrencyItem component', () => {
  test('renders currency item', () => {
    // Arrange
    const item = {
      currency: 'mockCUR',
      nameI18N: 'mockCurrency',
      exchangeRate: { buy: 78 }
    } as Fx;
    render(<CurrencyItem item={item} />);

    // Assert
    const listElement = screen.getByRole('listitem');
    expect(listElement).toBeInTheDocument();
  });
});
