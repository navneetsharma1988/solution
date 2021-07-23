import { Fx } from '../../models/currency.model';
import classes from './CurrencyItem.module.css';

const CurrencyItem: React.FC<{ item: Fx }> = ({ item }) => {
  const itemImage = `images/flags/${item?.currency.slice(0, 2).toLowerCase()}.png`;
  const itemExchangeRate = item?.exchangeRate?.buy.toFixed(item.precision);
  return (
    <li className={classes['list-item']}>
      <div className={classes.item}>
        <img src={itemImage} alt={item.nameI18N} height="20" width="auto" loading={"lazy"} />
        <span style={{ marginLeft: '10px' }}>{`${item.nameI18N} (${item.currency})`}</span>
        <span style={{ marginLeft: 'auto' }}>{itemExchangeRate ? `${itemExchangeRate} EUR` : null}</span>
      </div>
    </li>
  );
};

export default CurrencyItem;
