
const QuestionInsight = ({ category, difficulty, countByCategory }) => {
  if (category === 'any') {
    return <p>Please select a category to see the question count.</p>;
  }

  const counts = countByCategory[category] || {};

  switch (difficulty) {
    case 'any':
      return <p>Total Questions: {counts.total_question_count || 0}</p>;

    case 'easy':
      return <p>Total Easy Questions: {counts.total_easy_question_count || 0}</p>;

    case 'medium':
      return <p>Total Medium Questions: {counts.total_medium_question_count || 0}</p>;

    case 'hard':
      return <p>Total Hard Questions: {counts.total_hard_question_count || 0}</p>;

    default:
      return null;
  }
};

export default QuestionInsight;
