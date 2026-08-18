
const QuizCard = ({ quiz, onEdit, onDelete, onDuplicate, onPublish }) => {

	return (
		<div className='quiz-card'>
			<h3 className='quiz-card--header'>{quiz.general.title}</h3>
			<section className='quiz-card--content'>
				<p className='quiz-card--description'>{quiz.general.description}</p>
				<div className='quiz-card--meta'>
					<p className='quiz-card--meta-item'>Questions: {quiz.content.questionCount}</p>
					<p className='quiz-card--meta-item'>Time Limit: {quiz.rules.timeLimit} mins</p>
				</div>
				<div className='quiz-card--meta'>
					<p className='quiz-card--meta-item'>Attempts: {quiz.rules.attempts}</p>
					<p className='quiz-card--meta-item'>Passing Score: {quiz.rules.passingScore}%</p>
				</div>
				<div className='quiz-card--meta'>
					<p className='quiz-card--meta-item'>Completion XP: {quiz.rewards.completionXP}</p>
					<p className='quiz-card--meta-item'>Pass XP: {quiz.rewards.passXP}</p>
					<div className='quiz-card--meta'>
						<p className='quiz-card--meta-item'>Perfect Score XP: {quiz.rewards.perfectScoreXP}</p>
					</div>
				</div>
				<div className='quiz-card--meta'>
					<p className='quiz-card--meta'>Updated At: {quiz.updatedAt}</p>
					<p className='quiz-card--meta'>Created At: {quiz.createdAt}</p>
				</div>
			</section>
			{quiz.isPublished ? (
				<span className='quiz-card--status published'>Published</span>
			) : (
				<span className='quiz-card--status draft'>Draft</span>
			)}
			<div className='quiz-card-actions'>
				<button className='btn-primary' onClick={() => onEdit(quiz)}>
					Edit
				</button>
				<button className='btn-secondary' onClick={() => { }}>
					Preview
				</button>
				<button className='btn-success' onClick={() => onDuplicate(quiz.id)}>
					Duplicate
				</button>
				<button className='btn-warning' onClick={() => onPublish(quiz.id)}>
					Publish
				</button>
				<button className='btn-danger' onClick={() => onDelete(quiz.id)}>
					Delete
				</button>
			</div>
		</div>
	)
}

export default QuizCard