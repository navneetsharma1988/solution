import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { Fx } from '../models/currency.model';
import { useCurrencyList } from './useCurrencyList';


describe('useCurrencyList hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('returns currency list', async () => {
    // Arrange
    const mockAPIResponse = {
      fx: [
        {
          currency: 'USD',
          exchangeRate: { buy: 78 }
        }
      ] as Fx[]
    };

    fetchMock.mockResponse(JSON.stringify(mockAPIResponse));
    const { result, waitForNextUpdate } = renderHook(() => useCurrencyList());

    expect(result.current.status).toBe('loading');

    // Act
    await waitForNextUpdate();

    // Assert
    const { currencyList, status } = result.current;

    expect(status).toBe('loaded');
    expect(currencyList).toEqual(mockAPIResponse.fx);
  });

  test('returns error', async () => {
    // Arrange
    const mockError = 'API is down';
    fetchMock.mockRejectOnce(() => Promise.reject(new Error(mockError)));
    const { result, waitForNextUpdate } = renderHook(() => useCurrencyList());

    // Act
    await waitForNextUpdate();

    // Assert
    const { status, error } = result.current;

    expect(status).toBe('loaded');
    expect(error).toEqual(mockError);
  });
});
