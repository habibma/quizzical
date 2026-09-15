const QuestionSection = ({ title, description, children, count }) => (
  <section className="question-section">
    <header className="question-section__header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="question-section__count">{count}</span>
    </header>
    {children}
  </section>
);

export default QuestionSection;