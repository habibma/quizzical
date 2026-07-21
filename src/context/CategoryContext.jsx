import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../services/triviaService";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {

    const loadCategories = () => {
        try {
            const stored = localStorage.getItem("categories");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    };

    const [categories, setCategories] = useState(loadCategories);

    // Fetch categories only if nothing is stored
    useEffect(() => {
        if (categories.length > 0) return;

        getCategories()
            .then(data => {
                setCategories(
                    data.map(category => ({
                        id: category.id,
                        apiName: category.name,
                        displayName: category.name,
                        enabled: true,
                    }))
                );
            })
            .catch(err => console.error(err));
    }, []);

    // Persist every change
    useEffect(() => {
        if (categories.length === 0) return;

        localStorage.setItem(
            "categories",
            JSON.stringify(categories)
        );
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