import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'services-theme';

const ServicesThemeContext = createContext({
  theme: 'theme-2',
  toggleTheme: () => {},
});

export function ServicesThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'theme-1' ? 'theme-1' : 'theme-2';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'theme-1' ? 'theme-2' : 'theme-1';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ServicesThemeContext.Provider value={value}>
      {children}
    </ServicesThemeContext.Provider>
  );
}

export function useServicesTheme() {
  return useContext(ServicesThemeContext);
}
