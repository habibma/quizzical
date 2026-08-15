import { createContext, useContext, useState, useEffect } from "react";

const ApiContext = createContext();

const normalizeEndpoint = (endpoint, index) => ({
    id: endpoint.id ?? `${Date.now()}-${index}-${Math.random()}`,
    name: endpoint.name ?? "",
    method: endpoint.method ?? "GET",
    path: endpoint.path ?? "",
    description: endpoint.description ?? "",
});

const normalizeApi = (api) => ({
    ...api,
    enabled: api.enabled ?? true,
    isDefault: api.isDefault ?? false,
    endpoints: Array.isArray(api.endpoints)
        ? api.endpoints.map(normalizeEndpoint)
        : [],
});

export function ApiProvider({ children }) {

    const loadApis = () => {
        try {
            const stored = localStorage.getItem("apis");
            return stored ? JSON.parse(stored).map(normalizeApi) : [];
        } catch {
            return [];
        }
    };

    const [ apis, setApis ] = useState(loadApis);

    const addApi = (api) => {
        setApis(prev => {
            const normalizedApi = normalizeApi({
                ...api,
                id: api.id ?? `${Date.now()}-${Math.random()}`,
            });
            const hasDefault = prev.some(existingApi => existingApi.isDefault && existingApi.enabled);

            if (!hasDefault && normalizedApi.enabled) {
                normalizedApi.isDefault = true;
            }

            if (normalizedApi.isDefault) {
                return prev.map(existingApi => ({
                    ...existingApi,
                    isDefault: false,
                })).concat(normalizedApi);
            }

            return [...prev, normalizedApi];
        });
    }

    const updateApi = (id, updatedApi) => {
        setApis(prev => {
            const normalizedApi = normalizeApi(updatedApi);

            if (normalizedApi.isDefault) {
                return prev.map(api => api.id === id
                    ? { ...api, ...normalizedApi }
                    : { ...api, isDefault: false }
                );
            }

            return prev.map(api => api.id === id ? { ...api, ...normalizedApi } : api);
        });
    }

    const removeApi = (id) => {
        setApis(prev => {
            const wasDefault = prev.find(api => api.id === id)?.isDefault;
            const remainingApis = prev.filter(api => api.id !== id);

            if (wasDefault && remainingApis.length > 0) {
                const firstEnabledApi = remainingApis.find(api => api.enabled);
                if (firstEnabledApi) {
                    return remainingApis.map(api => api.id === firstEnabledApi.id
                        ? { ...api, isDefault: true }
                        : api
                    );
                }
            }
            return remainingApis;
        });
    }

    const getApiById = (id) => {
        return apis.find(api => api.id === id) || null;
    }

    useEffect(() => {
        localStorage.setItem("apis", JSON.stringify(apis));
    }, [apis]);

    return (
        <ApiContext.Provider value={{
            apis,
            addApi,
            updateApi,
            removeApi,
            getApiById,
        }}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used within an ApiProvider");
    }
    return context;
}
