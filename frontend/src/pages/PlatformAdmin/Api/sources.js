
export const apiSources = [
  {
    id: 1,
    name: "Open Trivia DB",
    baseUrl: "https://opentdb.com",
    enabled: true,
    isDefault: true,
    version: "v1",
    authentication: "none", // none | apiKey | bearer
    authDetails: {
      apiKey: null,
    },
    endpoints: [
      {
        id: 1,
        name: "Categories",
        type: "categories",
        method: "GET",
        path: "/api_category.php",
        description: "all available categories",
      },
      {
        id: 2,
        name: "Questions",
        type: "questions",
        method: "GET",
        path: "/api.php",
        description: "trivia questions",

        mapping: {
          question: "question",
          answer: "correct_answer",
          incorrectAnswers: "incorrect_answers",
          category: "category",
        },
      },
    ],
    difficulty: ["easy", "medium", "hard"],
    price: 0,
    adaptor: "opentdb",
  },
  {
    id: 2,
    name: "The Trivia API",
    baseUrl: "https://the-trivia-api.com/v2",
    enabled: true,
    isDefault: false,
    version: "v1",
    authentication: "none",
    authDetails: {
    apiKey: null,
    },
    endpoints: [
      {
        id: 1,
        name: "Categories",
        type: "categories",
        method: "GET",
        path: "/categories",
        description: "all available categories",
      },
      {
        id: 2,
        name: "Questions",
        type: "questions",
        method: "GET",
        path: "/questions",
        description: "trivia questions",
        mapping: {
          question: "question",
          answer: "correctAnswer",
          incorrectAnswers: "incorrectAnswers",
          category: "category",
        },
      },
    ],
    difficulty: ["easy", "medium", "hard"],
    price: 9.99,
    adaptor: "trivia-api",
  },
];
