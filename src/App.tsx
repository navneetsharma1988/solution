import React, { ChangeEvent, useState } from 'react';
import { useCurrencyList } from './hooks/useCurrencyList';
import { StatusEnum } from './models/status.enum';
import { Fx } from './models/currency.model';
import Header from './components/Header/Header';
import Result from './components/Result/Result';
import SearchBox from './components/SearchBox/SearchBox';
import { QueryParamsUtil } from './utils/queryParamsUtil';

function App() {
  const { currencyList, status, error } = useCurrencyList();
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchParams] = useState<string[]>(['currency', 'nameI18N']);

  React.useEffect(() => {
    // React Router package and useLocation & useHistory can be used but for this simple use case
    // should avoid increasing the bundle size
    const querySearchParams = QueryParamsUtil.getQuerySearchParams(window.location);
    setSearchInput(querySearchParams.searchInput);
  }, []);

  function onUpdateSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    QueryParamsUtil.updateURL(inputValue);
  }

  function search(items: Fx[]) {
    return items.filter((item) => {
      return searchParams.some((searchParam) => {
        return (
          item[searchParam as keyof Fx] &&
          item[searchParam as keyof Fx].toString().toLowerCase().indexOf(searchInput.trim().toLowerCase()) > -1
        );
      });
    });
  }

  let result;

  if (error) {
    result = <div>{error}</div>;
  } else if (status === StatusEnum.Loading) {
    result = <div>loading...</div>;
  } else {
    result = <Result items={search(currencyList)} />;
  }

  return (
    <div>
      <Header />
      <SearchBox searchInput={searchInput} updateSearchInput={onUpdateSearchInput} />
      {result}
    </div>
  );
}

export default App;
