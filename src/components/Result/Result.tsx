import classes from './Result.module.css';
import CurrencyItem from '../CurrencyItem/CurrencyItem';
import { Fx } from '../../models/currency.model';

const Result: React.FC<{ items: Fx[] }> = ({ items }) => {
  if (!items || !items.length) {
    return <h2>No Result Found!!!</h2>;
  }

  return (
    <ul className={classes.result}>
      {items.map((item: Fx) => (
        <CurrencyItem item={item} key={item.currency} />
      ))}
    </ul>
  );
};

export default Result;
