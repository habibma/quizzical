import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiContext.jsx';

const ReposContext = createContext();

// helper function to transform API data into repository format
const transformApiToRepository = (api) => {
    return {
        id: api.id,
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

    const [repositories, setRepositories] = useState([]);
    const { apis } = useApi();


    const apiNames = apis.map(api => api.name);

    const toggleRepository = (id) => {
        setRepositories(prevRepos => {
            const updatedRepos = prevRepos.map(repo => {
                if (repo.id === id) {
                    return { ...repo, isActive: !repo.isActive };
                }
                return repo;
            });
            return updatedRepos;
        });
    };

    useEffect(() => {
        if (!apis) return;

        const newRepositories = apis.filter(api => api.enabled).map(transformApiToRepository);
        setRepositories(newRepositories);
    }, [apis]);

    const activeRepositories = repositories.filter(repo => repo.isActive).map(repo => { return { id: repo.id, title: repo.title }; });
    console.log("Active Repositories:", activeRepositories); // Debugging line

    const value = {
        repositories,
        activeRepositories,
        toggleRepository,
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