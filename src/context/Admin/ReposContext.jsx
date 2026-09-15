import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiContext.jsx';
import { request } from '../../services/apiService.js';

const ReposContext = createContext();
const ACTIVE_REPOSITORIES_KEY = 'activeRepositories';

// helper function to transform API data into repository format
const transformApiToRepository = (api) => {
    return {
        id: api.id,
        apiId: api.id,

        title: api.name,
        description: api.description ?? "No description available.",

        baseUrl: api.baseUrl,

        isActive: api.enabled,

        endpoints: api.endpoints?.map(endpoint => ({
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
    const [healthByRepository, setHealthByRepository] = useState({});
    const { apis } = useApi();

    const toggleRepository = (id) => {
        setRepositories(prevRepos => {
            const updatedRepos = prevRepos.map(repo => {
                if (String(repo.id) === String(id)) {
                    return { ...repo, isActive: !repo.isActive };
                }
                return repo;
            });
            return updatedRepos;
        });
    };

    useEffect(() => {
        if (!apis) return;

        let storedActiveIds = null;
        try {
            const storedValue = localStorage.getItem(ACTIVE_REPOSITORIES_KEY);
            storedActiveIds = storedValue === null ? null : JSON.parse(storedValue);
        } catch {
            storedActiveIds = null;
        }

        const newRepositories = apis.filter(api => api.enabled).map(api => ({
            ...transformApiToRepository(api),
            isActive: storedActiveIds === null
                ? api.enabled
                : storedActiveIds.includes(String(api.id)),
        }));
        setRepositories(newRepositories);
    }, [apis]);

    useEffect(() => {
        localStorage.setItem(
            ACTIVE_REPOSITORIES_KEY,
            JSON.stringify(repositories.filter(repo => repo.isActive).map(repo => String(repo.id)))
        );
    }, [repositories]);

    const testRepository = async (repository) => {
        const endpoint = repository.endpoints?.find(item => item.method === 'GET') || repository.endpoints?.[0];

        if (!endpoint) {
            setHealthByRepository(prev => ({ ...prev, [repository.id]: { status: 'warning', message: 'No endpoint configured.' } }));
            return;
        }

        setHealthByRepository(prev => ({ ...prev, [repository.id]: { status: 'checking', message: 'Checking connection...' } }));

        try {
            const path = endpoint.path === '/api/questions' ? '/questions' : endpoint.path;
            await request(new URL(repository.baseUrl + path).toString(), { method: endpoint.method || 'GET' });
            setHealthByRepository(prev => ({ ...prev, [repository.id]: { status: 'healthy', message: 'Connection healthy.' } }));
        } catch (error) {
            setHealthByRepository(prev => ({ ...prev, [repository.id]: { status: 'offline', message: error.message } }));
        }
    };

    const activeRepositories = repositories.filter(repo => repo.isActive);


    const value = {
        repositories,
        activeRepositories,
        toggleRepository,
        healthByRepository,
        testRepository,
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