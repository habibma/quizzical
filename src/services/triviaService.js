import { decodeHtml } from "../utiles/decodeHtml.js";

// to fetch trivia questions from the Open Trivia Database API
export async function getQuestions(options = {}) {
  const {
    amount = 10,
    category = "any",
    difficulty = "any",
    type = "any",
  } = options;

  const params = new URLSearchParams({
    amount,
  });

  if (category !== "any")
    params.append("category", category);

  if (difficulty !== "any")
    params.append("difficulty", difficulty);

  if (type !== "any")
    params.append("type", type);

  const response = await fetch(
    `https://opentdb.com/api.php?${params}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error("No questions found.");
  }

  return data.results.map((question, index) => ({
    id: `${Date.now()}-${index}`,
    question: decodeHtml(question.question),
    answer: decodeHtml(question.correct_answer),
    options: [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - 0.5)
      .map(decodeHtml),
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