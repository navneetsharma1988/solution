import { renderHook } from "@testing-library/react-hooks";
import { Fx } from "../models/currency.model";
import useCurrencyList from "./useCurrencyList";
import fetchMock from "jest-fetch-mock";

describe('useCurrencyList hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('returns currency list', async () => {
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

    await waitForNextUpdate();

    const { currencyList, status } = result.current;

    expect(status).toBe('loaded');
    expect(currencyList).toEqual(mockAPIResponse.fx);
  });

  test('returns error', async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API is down"));
    const { result, waitForNextUpdate } = renderHook(() => useCurrencyList());

    await waitForNextUpdate();

    const { status, error } = result.current;

    expect(status).toBe('loaded');
    expect(error).toEqual('API is down');
  });
});