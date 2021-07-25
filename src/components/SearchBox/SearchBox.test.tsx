import { render } from '@testing-library/react';
import SearchBox from './SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox component', () => {
  const mockProps = {
    searchInput: 'mockInput',
    updateSearchInput: jest.fn()
  };
  const setup = () => {
    const utils = render(<SearchBox {...mockProps} />);
    const inputElement = utils.getByLabelText('currency-input') as HTMLInputElement;
    return {
      inputElement,
      ...utils
    };
  };

  test('renders input', () => {
    // Arrange
    const { inputElement } = setup();

    // Assert
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('handle onChange', () => {
    // Arrange
    const { inputElement } = setup();

    // Act
    userEvent.type(inputElement, 'USD');

    // Assert
    expect(mockProps.updateSearchInput).toHaveBeenCalled();
  });
});
