import React from 'react';
import classes from './Result.module.css';
import CurrencyItem from '../CurrencyItem/CurrencyItem';
import { Fx } from '../../models/currency.model';


const Result: React.FC<{ items: Fx[] }> = ({ items }) => {
  let result;
  if (!items || !items.length) {
    result = <h2>No Result Found!!!</h2>;
  } else {
    result = (
      <ul>
        {items.map((item: Fx) => (
          <CurrencyItem item={item} key={item.currency} />
        ))}
      </ul>
    );
  }

  return <div className={classes.result}>{result}</div>;
};

export default Result;
