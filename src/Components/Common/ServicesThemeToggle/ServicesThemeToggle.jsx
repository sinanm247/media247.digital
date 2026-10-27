import { useServicesTheme } from '../../../Context/ServicesThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function ServicesThemeToggle() {
  const { theme, toggleTheme } = useServicesTheme();
  return <ThemeToggle theme={theme} onToggle={toggleTheme} variant="inline" />;
}
