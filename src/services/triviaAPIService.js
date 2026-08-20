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

  console.log("Constructed URL for fetching questions:", url.toString());
  const data = await request(url.toString(), {
    method: endpoint.method
  });

  return adaptTriviaApiQuestions(data);
}
