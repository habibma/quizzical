const SearchInput = ({ ariaLabel, className, ...inputProps }) => (
  <input
    {...inputProps}
    className={className}
    type="search"
    aria-label={ariaLabel ?? inputProps['aria-label']}
  />
);

export default SearchInput;
