import { request } from "./apiService.js";
import { normalizeQuestions } from "./adaptors/openTriviaAdapter.js";

const resolveEndpoint = (apiConfig, candidates) => {
  if (!apiConfig?.endpoints?.length) {
    return null;
  }

  const normalizedCandidates = candidates.map(candidate => candidate.toLowerCase());

  return apiConfig.endpoints.find(endpoint => {
    const name = (endpoint.name || "").toLowerCase();
    const path = (endpoint.path || "").toLowerCase();

    return normalizedCandidates.some(candidate =>
      name.includes(candidate) || path.includes(candidate)
    );
  }) || apiConfig.endpoints[0];
};

// to fetch trivia questions from the Open Trivia Database API
export async function getQuestions(apiConfig, options = {}) {
  const endpoint = resolveEndpoint(apiConfig, ["questions", "get questions", "api.php"]);

  if (!endpoint) {
    throw new Error("No questions endpoint is configured for this API.");
  }

  const url = new URL(apiConfig.baseUrl + endpoint.path);
  const searchParams = new URLSearchParams();
  const {
    amount = 10,
    category = "any",
    difficulty = "any",
    type = "any"
  } = options;
  if (amount) {
    searchParams.append("amount", amount);
  }
  if (category !== "any") {
    searchParams.append("category", category);
  }
  if (difficulty !== "any") {
    searchParams.append("difficulty", difficulty);
  }
  if (type !== "any") {
    searchParams.append("type", type);
  }

  const uri = `${url.toString()}?${searchParams.toString()}`;

  const data = await request(uri, { method: endpoint.method });

  console.log("Fetched questions:", data.results); // Log the fetched questions for debugging
  return normalizeQuestions(data.results);
}

// to fetch trivia categories from the Open Trivia Database API
export async function getCategories(apiConfig) {
  if (!apiConfig) {
    throw new Error("No default API is configured.");
  }

  const endpoint = resolveEndpoint(apiConfig, ["categories", "get categories", "api_category.php"]);

  if (!endpoint) {
    throw new Error("No categories endpoint is configured for this API.");
  }

  const uri = apiConfig.baseUrl + endpoint.path;

  const data = await request(uri, { method: endpoint.method });

  return data.trivia_categories;
}

export async function getCategoryQuestionsCount(apiConfig, categoryId) {
  if (!apiConfig) {
    throw new Error("No default API is configured.");
  }

  const endpoint = resolveEndpoint(apiConfig, ["categoryquestionscount", "category questions count", "count"]);

  if (!endpoint) {
    throw new Error("No category count endpoint is configured for this API.");
  }

  const uri = `${apiConfig.baseUrl + endpoint.path}?category=${categoryId}`;

  const data = await request(uri, { method: endpoint.method });

  return data.category_question_count;
}
