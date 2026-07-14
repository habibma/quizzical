import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../services/triviaService";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(data => {
            // Initialize with enabled property as true
            const categoriesWithEnabled = data.map(category => ({
                ...category,
                enabled: true,
            }));
            
            setCategories(categoriesWithEnabled);
            
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

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
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
