import PageState from '../../../components/ui/PageState/PageState';

const CategoryState = ({ type, message, onRetry }) => (
  <PageState
    variant={type}
    message={message}
    onAction={onRetry}
    className="category-state"
  />
);

export default CategoryState;