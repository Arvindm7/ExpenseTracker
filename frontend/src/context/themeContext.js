import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export function ThemeContextProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        // Read from localStorage on initial load
        const saved = localStorage.getItem('expense-tracker-theme');
        if (saved !== null) {
            return saved === 'dark';
        }
        // Fallback: respect system preference
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
    });

    // Persist preference to localStorage
    useEffect(() => {
        localStorage.setItem('expense-tracker-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggle = () => setIsDark(prev => !prev);

    const theme = isDark ? darkTheme : lightTheme;

    const contextValue = useMemo(() => ({
        isDark,
        toggle,
    }), [isDark]);

    return (
        <ThemeToggleContext.Provider value={contextValue}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeToggleContext.Provider>
    );
}
