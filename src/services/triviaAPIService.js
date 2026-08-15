import { request } from "./apiService.js";
import { adaptTriviaApiCategories } from "./adaptors/theTriviaAdapter.js";

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