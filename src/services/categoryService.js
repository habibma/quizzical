import { getCategories as getOpenTDBCategories } from './opentdbService.js';
import { getCategories as getTriviaAPICategories } from './triviaAPIService.js';

export async function getCategories(repository) {

    const capabilities = repository.capabilities.find(cap => cap.name.toLowerCase().includes('categories'));
    if (!capabilities) {
        throw new Error("No categories capability is configured for this repository.");
    }

    const apiConfig = {
        baseUrl: repository.baseUrl,
        endpoint: capabilities.endpoint,
        method: capabilities.method,
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
