import { request } from "./apiService.js";
import { adaptTriviaApiCategories } from "./adaptors/theTriviaAdapter.js";
import { adaptTriviaApiQuestions } from "./adaptors/theTriviaAdapter.js";

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

export async function getCategories(apiConfig) {
  if (!apiConfig) {
    throw new Error("No default API is configured.");
  }

  const apiBaseUrl = apiConfig.baseUrl;
  const endpointPath = apiConfig.endpoint.startsWith("/") ? apiConfig.endpoint : `/${apiConfig.endpoint}`;
  const uri = `${apiBaseUrl}${endpointPath}`;

  const data = await request(uri, { method: apiConfig.method });

  return adaptTriviaApiCategories(data);
}

export async function getQuestions(repository, options = {}) {
  console.log("Fetching questions from repository:", repository);
  const endpoint = resolveEndpoint(repository, ["questions", "get questions", "fetch questions"]);

  const url = new URL(
    repository.baseUrl + endpoint.path
  );

  const {
    amount = 10,
    category,
    difficulty
  } = options;

  url.searchParams.set("limit", amount);

  if (category && category !== "any") {
    url.searchParams.set("categories", category);
  }

  if (difficulty && difficulty !== "any") {
    url.searchParams.set("difficulties", difficulty);
  }

  const data = await request(url.toString(), {
    method: endpoint.method
  });

  return adaptTriviaApiQuestions(data);
}
