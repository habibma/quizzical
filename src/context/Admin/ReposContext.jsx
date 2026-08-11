import { createContext, useContext } from 'react';
import { useApi } from './ApiContext.jsx';

const ReposContext = createContext();

// helper function to transform API data into repository format
const transformApiToRepository = (api) => {
    return {
        title: api.name,
        description: `API Version: ${api.version}`,
        version: api.version,
        numberOfQuestions: api.endpoints.find(endpoint => endpoint.name === "Get Questions") ? "Available" : "Not Available",
        numberOfCategories: api.endpoints.find(endpoint => endpoint.name === "Get Categories") ? "Available" : "Not Available",
        difficulty: api.difficulty ?? "Unknown",
        isActive: api.enabled,
        link: api.baseUrl,
        price: api.price ?? 0,
    };
};

export const ReposProvider = ({ children }) => {

    const { apis } = useApi();

    const repositories = apis.filter(api => api.enabled).map(transformApiToRepository);

    const apiNames = apis.map(api => api.name);
    console.log(" API Names:", apiNames);

    const value = {
        repositories,
        apiNames
    };

    return (
        <ReposContext.Provider value={value}>
            {children}
        </ReposContext.Provider>
    );
};

export const useRepo = () => {
    const context = useContext(ReposContext);
    if (!context) {
        throw new Error('useRepo must be used within a ReposProvider');
    }
    return context;
};

export default ReposContext;