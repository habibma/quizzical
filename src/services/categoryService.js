import { getCategories as getOpenTDBCategories } from './openTDBService.js';
import { getCategories as getTriviaAPICategories } from './triviaAPIService.js';

export async function getCategories(repository) {

    const endpoint = repository.capabilities.find(cap => cap.name.toLowerCase() === "categories");

    const apiConfig = {
        baseUrl: repository.baseUrl,
        endpoint: endpoint.path,
        method: endpoint.method,
    };

    switch (repository.adaptor) {
        case 'opentdb':
            return await getOpenTDBCategories(apiConfig);
        case 'trivia-api':
            return await getTriviaAPICategories(apiConfig);
        default:
            throw new Error(`Unknown adaptor: ${repository.adaptor}`);
    }
}
