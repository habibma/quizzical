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

    const [selectedRepoId, setSelectedRepoId] = useState('');
    const [categoriesByRepository, setCategoriesByRepository] =
        useState(loadCategoriesFromStorage);

    const { activeRepositories } = useRepo();


    // Select repository and load its categories
    const selectRepository = async (repoId) => {
        setSelectedRepoId(repoId);

        const repository = activeRepositories.find(
            repo => repo.id === repoId
        );

        if (!repository) return;

        // Already loaded?
        if (categoriesByRepository[repoId]) {
            return;
        }

        const fetchedCategories = await getCategories(repository);

        const normalizedCategories =
            fetchedCategories.map(normalizeCategory);

        setCategoriesByRepository(prev => ({
            ...prev,
            [repoId]: normalizedCategories,
        }));
    };


    // Persist categories
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categoriesByRepository)
        );
    }, [categoriesByRepository]);


    // Categories for currently selected repository
    const categories = categoriesByRepository[selectedRepoId] ?? [];


    // Only enabled categories
    const activeCategories = categories.filter(category => category.enabled);


    const toggleCategory = (id) => {
        setCategoriesByRepository(prev => ({
            ...prev,
            [selectedRepoId]: (prev[selectedRepoId] ?? []).map(category =>
                category.id === id
                    ? {
                        ...category,
                        enabled: !category.enabled,
                    }
                    : category
            ),
        }));
    };


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


    // Get enabled categories for one or more repositories
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
                categories,
                activeCategories,

                categoriesByRepository,

                selectedRepoId,
                selectRepository,

                toggleCategory,
                renameCategory,
                updateCategoryName: renameCategory,

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