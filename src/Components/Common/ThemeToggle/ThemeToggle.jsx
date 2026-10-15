import { useTheme } from '../../../Context/ThemeContext';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isTheme1 = theme === 'theme-1';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isTheme1 ? 'Theme II' : 'Theme I'}`}
      title={`Switch to ${isTheme1 ? 'Theme II' : 'Theme I'}`}
    >
      {/* Label */}
      <span className="theme-toggle__label">THEME</span>

      {/* Track with sliding pill */}
      <span className="theme-toggle__track" aria-hidden="true">
        <span className={`theme-toggle__pill ${isTheme1 ? '' : 'theme-toggle__pill--right'}`} />
        <span className="theme-toggle__opt">I</span>
        <span className="theme-toggle__opt">II</span>
      </span>
    </button>
  );
}
