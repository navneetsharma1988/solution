import classes from './SearchBox.module.css';

const SearchBox: React.FC<{ searchInput: string; updateSearchInput: React.ChangeEventHandler<HTMLInputElement> | undefined}> = ({
  searchInput,
  updateSearchInput
}) => {
  return (
    <div className={classes['search-box']}>
      <label htmlFor="currency-input">
        Search
        <input
          type="text"
          name="currency-input"
          id="currency-input"
          aria-label="currency-input"
          className={classes['currency-input']}
          value={searchInput}
          onChange={updateSearchInput}
          onBlur={updateSearchInput}
        />
      </label>
    </div>
  );
};

export default SearchBox;
