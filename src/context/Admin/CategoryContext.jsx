import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService.js";
import { useRepo } from "./ReposContext.jsx";

const CategoryContext = createContext();

const STORAGE_KEY = "categoriesByRepository";

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
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return {};

    try {
        const parsed = JSON.parse(stored);
        return Object.fromEntries(
            Object.entries(parsed).map(([repoId, categories]) => [
                repoId,
                Array.isArray(categories) ? categories.map(normalizeCategory) : [],
            ])
        );
    } catch {
        return {};
    }
};

export function CategoryProvider({ children }) {

    const [selectedRepoId, setSelectedRepoId] = useState(null);
    const [categoriesByRepository, setCategoriesByRepository] =
        useState(loadCategoriesFromStorage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { activeRepositories } = useRepo();


    // Load categories for a repository
    const getCategoriesForRepository = async (repoId) => {
        const normalizedRepoId = repoId ? String(repoId) : null;

        if (!normalizedRepoId) return [];

        // Return cached categories
        if (categoriesByRepository[normalizedRepoId]) {
            return categoriesByRepository[normalizedRepoId];
        }

        const repository = activeRepositories.find(
            repo => String(repo.id) === normalizedRepoId
        );

        if (!repository) return [];

      setLoading(true);
      setError(null);

      try {
            const apiCategories = await getCategories(repository);
            const normalizedCategories = apiCategories.map(normalizeCategory);
            setCategoriesByRepository(prev => ({
                ...prev,
                [normalizedRepoId]: normalizedCategories,
            }));
            return normalizedCategories;
        } catch (error) {
            setError(error.message || "Unable to load categories.");
            console.error("Error fetching categories for repository:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (repoId, categoryId) => {
        setCategoriesByRepository(prev => ({
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
        setCategoriesByRepository(prev => ({
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

        setCategoriesByRepository(prev => ({
            ...prev,
            [repoId]: normalizedCategories,
        }));
    };

    const updateCategoryDetails = (id, details) => {
        setCategoriesByRepository(prev => ({
            ...prev,
            [selectedRepoId]: (prev[selectedRepoId] ?? []).map(category =>
                category.id === id ? { ...category, ...details } : category
            ),
        }));
    };

    // Persist categories
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categoriesByRepository)
        );
    }, [categoriesByRepository]);

    // Select repository
    const selectRepository = (repoId) => {
        const normalizedRepoId = repoId ? String(repoId) : null;
        setSelectedRepoId(normalizedRepoId);
        getCategoriesForRepository(normalizedRepoId);
    };

    // Rename category
    const renameCategory = (id, displayName) => {
        setCategoriesByRepository(prev => ({
            ...prev,
            [selectedRepoId]: (prev[selectedRepoId] ?? []).map(category =>
                category.id === id
                    ? {
                        ...category,
                        displayName,
                    }
                    : category
            ),
        }));
    };

    // Get enabled categories from multiple repositories
    const getActiveCategories = (repoIds) => {
        return repoIds.flatMap(repoId =>
            (categoriesByRepository[repoId] ?? [])
                .filter(category => category.enabled)
                .map(category => ({
                    ...category,
                    repositoryId: repoId,
                }))
        );
    };


    return (
        <CategoryContext.Provider
            value={{
                categoriesByRepository,
                loading,
                error,

                selectedRepoId,
                selectRepository,

                toggleCategory,
                setCategoriesEnabled,
                importCategories,
                updateCategoryDetails,
                renameCategory,
                updateCategoryName: renameCategory,

                getCategoriesForRepository,
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
