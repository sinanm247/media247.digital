import { Link, NavLink } from 'react-router-dom';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { NAV_LINKS } from '../../../Datasets/navigation';
import StartProjectCard from '../StartProjectCard/StartProjectCard';
import './Navbar.scss';

export default function Navbar({ variant = 'default', rightSlot }) {
  const logo = THEME_ASSETS['theme-1'].logo.main;
  const slot = rightSlot === undefined ? <StartProjectCard /> : rightSlot;

  return (
    <header className={`navbar navbar--${variant}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Media247 Digital — Home">
          <img src={logo} alt="" className="navbar__logo" aria-hidden="true" />
        </Link>

        <nav className="navbar__nav" aria-label="Primary navigation">
          <ul className="navbar__list">
            {NAV_LINKS.map(({ number, label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' is-active' : ''}`
                  }
                  end={path === '/'}
                >
                  <span className="navbar__label">
                    {label}
                    <span className="navbar__num" aria-hidden="true">{number}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__right">
          {slot}
        </div>
      </div>
    </header>
  );
}
