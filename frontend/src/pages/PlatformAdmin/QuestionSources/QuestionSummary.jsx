import SummaryCards from '../../../components/ui/SummaryCards/SummaryCards';

const QuestionSummary = ({ apiCount, customCount, visibleCount, selectedApi, isTeacherView }) => (
  <SummaryCards
    ariaLabel="Question summary"
    className="question-summary"
    cardClassName="question-summary__card"
    items={[
      { label: 'API Questions', value: apiCount },
      { label: 'Custom Questions', value: customCount },
      { label: 'Visible', value: visibleCount },
      {
        label: isTeacherView ? 'Repository' : 'API',
        value: selectedApi || (isTeacherView ? 'Choose a repository' : 'Choose an API'),
        className: 'question-summary__card--wide',
      },
    ]}
  />
);

export default QuestionSummary;