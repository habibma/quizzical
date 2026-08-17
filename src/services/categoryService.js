import { getCategories as getOpenTDBCategories } from './opentdbService.js';
import { getCategories as getTriviaAPICategories } from './triviaAPIService.js';

export async function getCategories(repository) {

    console.log("repository: ", repository);
    const endpoint = repository.capabilities.find(cap => cap.name.toLowerCase() === "categories");

    console.log(endpoint);

    const apiConfig = {
        baseUrl: repository.baseUrl,
        endpoint: endpoint.path,
        method: endpoint.method,
    };

    console.log(apiConfig);

    switch (repository.adaptor) {
        case 'opentdb':
            return await getOpenTDBCategories(apiConfig);
        case 'trivia-api':
            return await getTriviaAPICategories(apiConfig);
        default:
            throw new Error(`Unknown adaptor: ${repository.adaptor}`);
    }
}
