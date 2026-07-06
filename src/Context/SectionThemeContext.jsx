import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DEFAULT_THEME = {
  bgStart: '#ffffff',
  bgEnd: '#f5f5f5',
  text: '#1a1a1a',
  heading: '#0a0a0a',
};

const SectionThemeContext = createContext({
  setSectionTheme: () => {},
  resetSectionTheme: () => {},
  currentTheme: DEFAULT_THEME,
});

export function SectionThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--section-bg-start', currentTheme.bgStart);
    root.style.setProperty('--section-bg-end', currentTheme.bgEnd);
    root.style.setProperty('--section-text', currentTheme.text);
    root.style.setProperty('--section-heading', currentTheme.heading);
  }, [currentTheme]);

  const value = useMemo(
    () => ({
      setSectionTheme: (theme) => {
        setCurrentTheme((prev) => ({
          ...prev,
          ...theme,
        }));
      },
      resetSectionTheme: () => setCurrentTheme(DEFAULT_THEME),
      currentTheme,
    }),
    [currentTheme],
  );

  return (
    <SectionThemeContext.Provider value={value}>
      {children}
    </SectionThemeContext.Provider>
  );
}

export function useSectionTheme() {
  return useContext(SectionThemeContext);
}
