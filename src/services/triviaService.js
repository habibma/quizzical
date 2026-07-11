
// to fetch trivia questions from the Open Trivia Database API
export async function getQuestions(options) {
  const { amount, category, difficulty, type } = options;
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  const response = await fetch(url);
  if (!response.ok) {
	throw new Error(`An error has occurred: ${response.status}`);
  }
  const data = await response.json();
  return data.results.map((obj) => ({
	id: obj.id,
	question: obj.question,
	answer: obj.correct_answer,
	options: obj.incorrect_answers
	  .concat(obj.correct_answer)
	  .sort(() => 0.5 - Math.random()),
	selectedOption: "",
  }));
}

// to fetch trivia categories from the Open Trivia Database API
export async function getCategories() {
  const response = await fetch("https://opentdb.com/api_category.php");
  if (!response.ok) {
	throw new Error(`An error has occurred: ${response.status}`);
  }
  const data = await response.json();
  return data.trivia_categories;
}