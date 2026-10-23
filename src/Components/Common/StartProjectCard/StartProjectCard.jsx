import { Link } from 'react-router-dom';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './StartProjectCard.scss';

const photo = THEME_ASSETS['theme-2'].images.image3;

export default function StartProjectCard() {
  const { kicker, title, role, path } = SITE_CONTENT.projectCard;

  return (
    <Link to={path} className="start-project">
      <img src={photo} alt="" className="start-project__photo" aria-hidden="true" />
      <span className="start-project__copy">
        <span className="start-project__kicker">{kicker}</span>
        <span className="start-project__title">{title}</span>
        <span className="start-project__role">{role}</span>
      </span>
      <span className="start-project__arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
