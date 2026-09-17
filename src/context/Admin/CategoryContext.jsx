import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService.js";
import { useRepo } from "./ReposContext.jsx";
import { useApi } from "./ApiContext.jsx";

const CategoryContext = createContext();

const STORAGE_KEY = "categoriesBySource";
const LEGACY_STORAGE_KEY = "categoriesByRepository";

const normalizeCategory = (category) => ({
    id: category.id,
    apiName: category.apiName ?? category.name,
    displayName: category.displayName ?? category.name,
    enabled: category.enabled ?? true,
    icon: category.icon ?? " ",
    color: category.color ?? "#6366f1",
    displayOrder: Number.isFinite(Number(category.displayOrder)) ? Number(category.displayOrder) : 0,
});

const loadCategoriesFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);

    if (!stored) return {};

    try {
        const parsed = JSON.parse(stored);
        return Object.fromEntries(
            Object.entries(parsed).map(([sourceId, categories]) => [
                sourceId,
                Array.isArray(categories) ? categories.map(normalizeCategory) : [],
            ])
        );
    } catch {
        return {};
    }
};

export function CategoryProvider({ children }) {

    const [selectedSourceId, setSelectedSourceId] = useState(null);
    const [categoriesBySource, setCategoriesBySource] =
        useState(loadCategoriesFromStorage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { apis } = useApi();
    const { activeRepositories } = useRepo();

    const loadCategories = async (source, normalizedSourceId) => {
        setLoading(true);
        setError(null);

        try {
            const apiCategories = await getCategories(source);
            const normalizedCategories = apiCategories.map(normalizeCategory);
            setCategoriesBySource(prev => ({
                ...prev,
                [normalizedSourceId]: normalizedCategories,
            }));
            return normalizedCategories;
        } catch (error) {
            setError(error.message || "Unable to load categories.");
            console.error("Error fetching categories for source:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };


    const getCategoriesForSource = async (sourceId) => {
        const normalizedSourceId = sourceId ? String(sourceId) : null;

        if (!normalizedSourceId) return [];

        // Return cached categories
        if (categoriesBySource[normalizedSourceId]) {
            return categoriesBySource[normalizedSourceId];
        }

        const source = activeRepositories.find(item => String(item.id) === normalizedSourceId)
            ?? apis.find(item => String(item.id) === normalizedSourceId && item.enabled);

        if (!source) return [];

        return loadCategories(source, normalizedSourceId);
    };

    const getCategoriesForApi = async (apiId) => {
        const normalizedApiId = apiId ? String(apiId) : null;

        if (!normalizedApiId) return [];

        if (categoriesBySource[normalizedApiId]) {
            return categoriesBySource[normalizedApiId];
        }

        const api = apis.find(source => String(source.id) === normalizedApiId && source.enabled);

        if (!api) return [];

        return loadCategories(api, normalizedApiId);
    };

    const toggleCategory = (repoId, categoryId) => {
            setCategoriesBySource(prev => ({
            ...prev,
            [repoId]: (prev[repoId] ?? []).map(category =>
                category.id === categoryId
                    ? {
                        ...category,
                        enabled: !category.enabled,
                    }
                    : category
            ),
        }));
    };

    const setCategoriesEnabled = (repoId, categoryIds, enabled) => {
        setCategoriesBySource(prev => ({
            ...prev,
            [repoId]: (prev[repoId] ?? []).map(category =>
                categoryIds.includes(category.id)
                    ? { ...category, enabled }
                    : category
            ),
        }));
    };

    const importCategories = (repoId, importedCategories) => {
        const normalizedCategories = importedCategories
            .filter(category => category.apiName || category.name || category.displayName)
            .map(category => normalizeCategory({
                ...category,
                id: category.id ?? `${Date.now()}-${Math.random()}`,
                name: category.apiName ?? category.name ?? category.displayName,
            }));

        setCategoriesBySource(prev => ({
            ...prev,
            [repoId]: normalizedCategories,
        }));
    };

    const updateCategoryDetails = (id, details) => {
        setCategoriesBySource(prev => ({
            ...prev,
            [selectedSourceId]: (prev[selectedSourceId] ?? []).map(category =>
                category.id === id ? { ...category, ...details } : category
            ),
        }));
    };

    // Persist categories
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categoriesBySource)
        );
    }, [categoriesBySource]);

    const selectSource = (sourceId) => {
        const normalizedSourceId = sourceId ? String(sourceId) : null;
        setSelectedSourceId(normalizedSourceId);
        getCategoriesForSource(normalizedSourceId);
    };

    const selectApi = (apiId) => {
        const normalizedApiId = apiId ? String(apiId) : null;
        setSelectedSourceId(normalizedApiId);
        getCategoriesForApi(normalizedApiId);
    };

    // Rename category
    const renameCategory = (id, displayName) => {
        setCategoriesBySource(prev => ({
            ...prev,
            [selectedSourceId]: (prev[selectedSourceId] ?? []).map(category =>
                category.id === id
                    ? {
                        ...category,
                        displayName,
                    }
                    : category
            ),
        }));
    };

    // Get enabled categories from multiple sources
    const getActiveCategories = (sourceIds) => {
        return sourceIds.flatMap(sourceId =>
            (categoriesBySource[sourceId] ?? [])
                .filter(category => category.enabled)
                .map(category => ({
                    ...category,
                    sourceId,
                }))
        );
    };


    return (
        <CategoryContext.Provider
            value={{
                categoriesBySource,
                loading,
                error,

                selectedSourceId,
                selectSource,
                selectApi,

                toggleCategory,
                setCategoriesEnabled,
                importCategories,
                updateCategoryDetails,
                renameCategory,
                updateCategoryName: renameCategory,

                getCategoriesForSource,
                getCategoriesForApi,
                getActiveCategories,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}


export function useCategories() {
    const context = useContext(CategoryContext);

    if (!context) {
        throw new Error(
            "useCategories must be used within a CategoryProvider"
        );
    }

    return context;
}
