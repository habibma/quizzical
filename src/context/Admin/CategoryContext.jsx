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
});

const loadCategoriesFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return {};

    try {
        return JSON.parse(stored);
    } catch {
        return {};
    }
};

export function CategoryProvider({ children }) {

    const [selectedRepoId, setSelectedRepoId] = useState(null);
    const [categoriesByRepository, setCategoriesByRepository] =
        useState(loadCategoriesFromStorage);

    const { activeRepositories } = useRepo();


    // Load categories for a repository
    const getCategoriesForRepository = async (repoId) => {
        // Return cached categories
        if (categoriesByRepository[repoId]) {
            return categoriesByRepository[repoId];
        }

        const repository = activeRepositories.find(
            repo => repo.id === repoId
        );

        if (!repository) return [];

       try {
            const apiCategories = await getCategories(repository.apiId);
            const normalizedCategories = apiCategories.map(normalizeCategory);
            setCategoriesByRepository(prev => ({
                ...prev,
                [repoId]: normalizedCategories,
            }));
            return normalizedCategories;
        } catch (error) {
            console.error("Error fetching categories for repository:", error);
            return [];
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

    // Persist categories
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categoriesByRepository)
        );
    }, [categoriesByRepository]);

    // Select repository
    const selectRepository = (repoId) => {
        setSelectedRepoId(repoId);
        getCategoriesForRepository(repoId);
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

                selectedRepoId,
                selectRepository,

                toggleCategory,
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
