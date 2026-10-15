import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'theme-1',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('site-theme') || 'theme-1';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'theme-1' ? 'theme-2' : 'theme-1';
      localStorage.setItem('site-theme', next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
