import Button from '../../../components/ui/Button/Button';

const QuestionState = ({ type, message, onRetry }) => (
  <div className={`question-state question-state--${type}`} role={type === 'error' ? 'alert' : undefined}>
    <p>{message}</p>
    {onRetry && <Button onClick={onRetry} text="Retry" />}
  </div>
);

export default QuestionState;