import { createContext, ReactNode, useReducer } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme?: () => void | undefined;
}
export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark' });

const themeReducer = (state: ThemeContextType, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
        default:
            return state;
    }
}

interface ThemeProviderProps {
    children: ReactNode;
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [state, dispatch] = useReducer(themeReducer, {
        theme: "dark"
    });

    const toggleTheme = () => {
        dispatch({ type: 'TOGGLE_THEME' });
    }

    return (
        <ThemeContext.Provider value={{ ...state, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
