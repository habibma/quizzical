import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService.js";
import { useRepo } from "./ReposContext.jsx";

const CategoryContext = createContext();

const STORAGE_KEY = "categories";
const SOURCE_KEY = "categoriesSourceApiId";

const normalizeCategory = (category) => ({
    id: category.id,
    apiName: category.apiName ?? category.name,
    displayName: category.displayName ?? category.name,
    enabled: category.enabled ?? true,
});

const loadCategoriesFromStorage = () => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    const parsedCategories = storedCategories ? JSON.parse(storedCategories) : [];
    return parsedCategories.map(normalizeCategory);
};

export function CategoryProvider({ children }) {

    const [selectedRepoId, setSelectedRepoId] = useState('');
    const [categories, setCategories] = useState(loadCategoriesFromStorage());

    const { activeRepositories } = useRepo();

    const selectRepository = async (repoId) => {
        setSelectedRepoId(repoId);

        const repository = activeRepositories.find(repo => repo.id === repoId);

        if (!repository) return;

        const fetchedCategories = await getCategories(repository);
        const normalizedCategories = fetchedCategories.map(normalizeCategory);
        setCategories(normalizedCategories);
    }


    // Persist every change
    useEffect(() => {
        if (categories.length === 0) return;

        console.log("Persisting categories to localStorage:", categories);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categories)
        );
        if (selectedRepoId) {
            localStorage.setItem(SOURCE_KEY, String(selectedRepoId));
        }
    }, [categories]);

    const toggleCategory = (id) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === id
                    ? { ...category, enabled: !category.enabled }
                    : category
            )
        );
    };

    const renameCategory = (id, displayName) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === id
                    ? { ...category, displayName }
                    : category
            )
        );
    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                toggleCategory,
                renameCategory,
                updateCategoryName: renameCategory,
                selectedRepoId,
                selectRepository,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoryContext);

    if (!context) {
        throw new Error("useCategories must be used within a CategoryProvider");
    }

    return context;
}