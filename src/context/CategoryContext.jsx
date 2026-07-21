import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../services/triviaService";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {

    const loadCategoriesFromLocalStorage = () => {
        const storedCategories = localStorage.getItem('categoriesToSave');
        if (storedCategories) {
            const stored = JSON.parse(storedCategories);
            return Object.keys(stored).map(id => ({
                id: parseInt(id),
                apiName: "", // Placeholder, will be updated when fetching from API
                displayName: "", // Placeholder, will be updated when fetching from API
                enabled: stored[id]
            }));
        }
    }

    const [categories, setCategories] = useState(loadCategoriesFromLocalStorage());

    console.log('CategoryProvider: categories state updated', categories);
    const toggleCategoryEnabled = (categoryId) => {
        setCategories(prevCategories => {
            const updated = prevCategories.map(category => {
                if (category.id === categoryId) {
                    return { ...category, enabled: !category.enabled };
                }
                return category;
            });
            return updated;
        });
    };

    const updateCategoryName = (categoryId, newName) => {
        setCategories(prevCategories => {
            const updated = prevCategories.map(category => {
                if (category.id === categoryId) {
                    return { ...category, displayName: newName };
                }
                return category;
            });
            return updated;
        });
    };

    useEffect(() => {
        getCategories().then(data => {
            // Initialize with enabled property as true
            const categories = data.map(category => ({
                id: category.id,
                apiName: category.name,
                displayName: category.name,
                enabled: true
            }));

            setCategories(categories);

            // Load saved enabled/disabled state from localStorage
            const storedCategories = localStorage.getItem('categoriesToSave');
            if (storedCategories) {
                const stored = JSON.parse(storedCategories);
                setCategories(prevCategories => prevCategories.map(category => ({
                    ...category,
                    enabled: stored[category.id] !== undefined ? stored[category.id] : category.enabled
                })));
            }
        }).catch(err => {
            console.error('Failed to load categories:', err);
        });

        // Listen for storage changes from other browser tabs/windows
        const handleStorageChange = (event) => {
            if (event.key === 'categoriesToSave' && event.newValue) {
                const stored = JSON.parse(event.newValue);
                setCategories(prevCategories => prevCategories.map(category => ({
                    ...category,
                    enabled: stored[category.id] !== undefined ? stored[category.id] : category.enabled
                })));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // save to localStorage whenever categories change
    useEffect(() => {
        if (categories.length > 0) {
            const categoriesToSave = categories.reduce((acc, category) => {
                acc[category.id] = category.enabled;
                return acc;
            }, {});
            localStorage.setItem('categoriesToSave', JSON.stringify(categoriesToSave));
        }
    }, [categories]);

    return (
        <CategoryContext.Provider value={{ categories, toggleCategory: toggleCategoryEnabled, updateCategoryName }}>
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
