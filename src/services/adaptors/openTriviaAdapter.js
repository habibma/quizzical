import { decodeHtml } from "../../utiles/decodeHtml.js";

export function normalizeQuestions(questions) {
  return questions.map(question => ({
    id: question.id,
    question: decodeHtml(question.question),
    answer: decodeHtml(question.correct_answer),
    options: [...question.incorrect_answers, question.correct_answer]
      .map(option => decodeHtml(option)),
  }));
}
