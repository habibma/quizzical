import Button from '../../../components/ui/Button/Button';

const CategoryState = ({ type, message, onRetry }) => (
  <div className={`category-state category-state--${type}`} role={type === 'error' ? 'alert' : undefined}>
    <p>{message}</p>
    {onRetry && <Button onClick={onRetry} text="Retry" />}
  </div>
);

export default CategoryState;