const QuestionState = ({ type, message, onRetry }) => (
  <div className={`question-state question-state--${type}`} role={type === 'error' ? 'alert' : undefined}>
    <p>{message}</p>
    {onRetry && <button type="button" onClick={onRetry}>Retry</button>}
  </div>
);

export default QuestionState;