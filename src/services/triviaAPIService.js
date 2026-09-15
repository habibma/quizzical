import { request } from "./apiService.js";
import { adaptTriviaApiCategories } from "./adaptors/theTriviaAdapter.js";
import { adaptTriviaApiQuestions } from "./adaptors/theTriviaAdapter.js";

export function resolveEndpoint(repository, candidates) {

  if (!repository?.endpoints?.length) {
    console.error("No endpoints found for the repository:", repository);
    return null;
  }

  const normalizedCandidates = candidates.map(candidate => candidate.toLowerCase());

  const endpoint = repository.endpoints.find(endpoint => {
    const name = (endpoint.name || "").toLowerCase();
    const path = (endpoint.path || "").toLowerCase();

    return normalizedCandidates.some(candidate =>
      name.includes(candidate) || path.includes(candidate)
    );
  });

  return endpoint;
}

// to get catedories
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

// to get questions
export async function getQuestions(repository, options = {}) {
  const endpoint = resolveEndpoint(repository, ["questions", "get questions", "fetch questions"]);

  if (!endpoint) {
    throw new Error("No questions endpoint is configured for this API.");
  }

  // Older saved configurations used /api/questions, which is not a v2 route.
  const endpointPath = endpoint.path === "/api/questions" ? "/questions" : endpoint.path;

  const url = new URL(
    repository.baseUrl + endpointPath
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
