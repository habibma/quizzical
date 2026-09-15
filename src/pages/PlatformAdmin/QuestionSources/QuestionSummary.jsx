const QuestionSummary = ({ apiCount, customCount, visibleCount, selectedRepository }) => (
  <section className="question-summary" aria-label="Question summary">
    <div className="question-summary__card">
      <span>API Questions</span>
      <strong>{apiCount}</strong>
    </div>
    <div className="question-summary__card">
      <span>Custom Questions</span>
      <strong>{customCount}</strong>
    </div>
    <div className="question-summary__card">
      <span>Visible</span>
      <strong>{visibleCount}</strong>
    </div>
    <div className="question-summary__card question-summary__card--wide">
      <span>Repository</span>
      <strong>{selectedRepository || 'Choose a repository'}</strong>
    </div>
  </section>
);

export default QuestionSummary;