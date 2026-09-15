const CategoryState = ({ type, message, onRetry }) => (
  <div className={`category-state category-state--${type}`} role={type === 'error' ? 'alert' : undefined}>
    <p>{message}</p>
    {onRetry && <button type="button" onClick={onRetry}>Retry</button>}
  </div>
);

export default CategoryState;