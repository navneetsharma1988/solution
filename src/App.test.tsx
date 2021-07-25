import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as useCurrencyList from './hooks/useCurrencyList';
import { StatusEnum } from './models/status.enum';
import { Fx } from './models/currency.model';

jest.mock('./hooks/useCurrencyList');
const mockedUseCurrencyList = useCurrencyList as jest.Mocked<typeof useCurrencyList>;

const mockResultComponent = jest.fn();
jest.mock('./components/Result/Result', () => (props: { items: Fx[] }) => {
  mockResultComponent(props);
  // @ts-ignore
  return <mock-resultComponent />;
});

describe('App component', () => {
  beforeEach(() => {
    mockedUseCurrencyList.useCurrencyList.mockReset();
  });

  test('renders with loading text', () => {
    mockedUseCurrencyList.useCurrencyList.mockImplementation(() => {
      return {
        status: StatusEnum.Loading,
        error: null,
        currencyList: []
      };
    });

    render(<App />);

    const loadingElement = screen.getByText('loading', { exact: false });
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders with error', () => {
    mockedUseCurrencyList.useCurrencyList.mockImplementation(() => {
      return {
        status: StatusEnum.Loading,
        error: 'mocked error',
        currencyList: [] as Fx[]
      };
    });

    render(<App />);

    const errorElement = screen.getByText('mocked error');
    expect(errorElement).toBeInTheDocument();
  });

  test('renders with Result component', () => {
    mockedUseCurrencyList.useCurrencyList.mockImplementation(() => {
      return {
        status: StatusEnum.Loaded,
        error: null,
        currencyList: [{ currency: 'USD' }] as Fx[]
      };
    });

    render(<App />);

    expect(mockResultComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        items: expect.arrayContaining([expect.objectContaining({ currency: 'USD' })])
      })
    );
  });
});
