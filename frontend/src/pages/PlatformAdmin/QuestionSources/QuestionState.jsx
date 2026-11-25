import PageState from '../../../components/ui/PageState/PageState';

const QuestionState = ({ type, message, onRetry }) => (
  <PageState
    variant={type}
    message={message}
    onAction={onRetry}
    className="question-state"
  />
);

export default QuestionState;