import { getQuestions as getOpenTDBQuestions } from "./openTDBService.js";
import { getQuestions as getTriviaAPIQuestions } from "./triviaAPIService.js";


export async function getQuestions(repository, params) {

    if (!repository) {
        throw new Error("No repository is selected.");
    }
    if (!repository.adaptor) {
        throw new Error("No adaptor is configured for the selected repository.");
    }

    switch (repository.adaptor) {
        case 'opentdb':
            return getOpenTDBQuestions(repository, params);
        case 'trivia-api':
            return getTriviaAPIQuestions(repository, params);
        default:
            throw new Error(`Unknown adaptor: ${repository.adaptor}`);
    }
}
