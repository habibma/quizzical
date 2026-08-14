import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/openTDBService.js";
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

export function CategoryProvider({ children }) {

    const [selectedRepoId, selectRepository] = useState('');
    const [categories, setCategories] = useState([]);

    const { ActiveRepositories } = useRepo();


    useEffect(() => {
        if (!selectedRepoId) return;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const storedSourceApiId = localStorage.getItem(SOURCE_KEY);

            if (stored && String(selectedRepoId) === storedSourceApiId) {
                setCategories(JSON.parse(stored).map(normalizeCategory));
                return;
            }
        } catch {
            // fall back
        }
        const repo = ActiveRepositories.find(api => api.id === selectedRepoId);
        getCategories(repo) /// <-----
            .then(data => {
                setCategories(
                    data.map(category => normalizeCategory({
                        id: category.id,
                        name: category.name,
                        enabled: true,
                    }))
                );
            })
            .catch(err => console.error(err));
    }, [selectedRepoId, ActiveRepositories]);

    // Persist every change
    useEffect(() => {
        if (categories.length === 0) return;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categories)
        );
        if ( selectedRepoId) {
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