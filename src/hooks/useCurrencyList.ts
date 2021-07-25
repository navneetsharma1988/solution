import { useEffect, useState } from 'react';
import { Fx } from '../models/currency.model';
import { StatusEnum } from '../models/status.enum';

const baseURL = 'https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343';

export const useCurrencyList = () => {
  const [currencyList, setCurrencyList] = useState<Fx[]>([]);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.Unloaded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrencyList() {
      try {
        setStatus(StatusEnum.Loading);
        const response = await fetch(baseURL);
        const data = await response.json();
        // filter items without currency & exchangeRate
        const filteredCurrencyList: Fx[] = data.fx.filter(
          (item: Fx) => item.currency.trim() && item?.exchangeRate?.buy
        );
        setCurrencyList(filteredCurrencyList);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setStatus(StatusEnum.Loaded);
      }
    }

    getCurrencyList();
  }, []);

  return { currencyList, status, error };
};
