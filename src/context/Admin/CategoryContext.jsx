import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/openTDBService.js";
import { useApi } from "./ApiContext.jsx";

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

    const { getDefaultApi } = useApi();

    const defaultApi = getDefaultApi();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!defaultApi) return;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const storedSourceApiId = localStorage.getItem(SOURCE_KEY);

            if (stored && String(defaultApi.id) === storedSourceApiId) {
                setCategories(JSON.parse(stored).map(normalizeCategory));
                return;
            }
        } catch {
            // fall back
        }

        getCategories(defaultApi)
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
    }, [defaultApi]);

    // Persist every change
    useEffect(() => {
        if (categories.length === 0) return;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(categories)
        );
        if (defaultApi) {
            localStorage.setItem(SOURCE_KEY, String(defaultApi.id));
        }
    }, [categories, defaultApi]);

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