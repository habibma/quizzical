import { decodeHtml } from "../../utiles/decodeHtml.js";

export function normalizeQuestions(questions) {
  return questions.map(question => ({
    id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
    question: decodeHtml(question.question),
    answer: decodeHtml(question.correct_answer),
    options: [...question.incorrect_answers, question.correct_answer]
      .map(option => decodeHtml(option)),
  }));
}
