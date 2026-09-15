
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
        method: "GET",
        path: "/api_category.php",
        description: "all available categories",
      },
      {
        id: 2,
        name: "Questions",
        method: "GET",
        path: "/api.php",
        description: "trivia questions",
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
        method: "GET",
        path: "/categories",
        description: "all available categories",
      },
      {
        id: 2,
        name: "Questions",
        method: "GET",
        path: "/questions",
        description: "trivia questions",
      },
    ],
    difficulty: ["easy", "medium", "hard"],
    price: 9.99,
    adaptor: "trivia-api",
  },
];
