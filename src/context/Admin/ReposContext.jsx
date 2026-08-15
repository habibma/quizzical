import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiContext.jsx';

const ReposContext = createContext();

// helper function to transform API data into repository format
const transformApiToRepository = (api) => {
    return {
        id: api.id,
        apiId: api.id,

        title: api.name,
        description: api.description ?? `API Version: ${api.version}`,
        version: api.version,

        baseUrl: api.baseUrl,

        isActive: api.enabled,

        capabilities: api.endpoints.map(endpoint => ({
            id: endpoint.id,
            name: endpoint.name,
            description: endpoint.description,
            path: endpoint.path,
            method: endpoint.method,
        })),

        adaptor: api.adaptor ?? null,
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

    const activeRepositories = repositories.filter(repo => repo.isActive);


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