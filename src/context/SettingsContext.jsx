import { createContext, useContext, useState, useEffect } from 'react';
import { defaultSettings } from '../config/defaultSettings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const loadSettings = () => {
        const savedSettings = localStorage.getItem('quizSettings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
        return defaultSettings;
    }

    const [settings, setSettings] = useState(() => loadSettings());

    useEffect(() => {
        localStorage.setItem('quizSettings', JSON.stringify(settings));
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
