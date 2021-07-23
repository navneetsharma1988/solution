import { useState, useEffect } from "react";
import { Fx } from "../models/currency.model";

const baseURL = 'https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343';

export default function useCurrencyList() {
  const [currencyList, setCurrencyList] = useState([]);
  const [status, setStatus] = useState('unloaded');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCurrencyList() {
      try {
        setStatus('loading');
        const response = await fetch(baseURL);
        const data = await response.json();
        // filter items without currency & exchangeRate
        const filteredCunrrecyList = data.fx.filter((item : Fx) => item.currency.trim() && item.exchangeRate.buy)
        setCurrencyList(filteredCunrrecyList);
        setError(null);
      } catch(error) {
        setError(error);
      } finally {
        setStatus('loaded');
      }
    }

    getCurrencyList();
  }, []);

  return { currencyList, status, error }
}