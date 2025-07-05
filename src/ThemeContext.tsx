// src/context/ThemeContext.tsx
import {createContext, useEffect, useState, ReactNode} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {
    },
});

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        if (theme === "dark") {
            const audio = new Audio('/flashbang.mp3');
            audio.currentTime = 1.8;
            audio.play().catch(err => console.error('Audio playback failed:', err));

        }
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
