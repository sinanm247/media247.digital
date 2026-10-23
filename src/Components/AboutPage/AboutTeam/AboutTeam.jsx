import { useRef } from 'react';
import AboutStrip from '../AboutStrip/AboutStrip';
import { useInclineReveal } from '../../../Hooks/useInclineReveal';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import ahmed from '../../../assets/Theme-1/Team/Ahmed.webp';
import sanal from '../../../assets/Theme-1/Team/Sanal.webp';
import reynold from '../../../assets/Theme-1/Team/Reynold.webp';
import yupar from '../../../assets/Theme-1/Team/Yupar.webp';
import sadik from '../../../assets/Theme-1/Team/Sadik.webp';
import mizna from '../../../assets/Theme-1/Team/Mizna.webp';
import sinan from '../../../assets/Theme-1/Team/Sinan.webp';
import sierra from '../../../assets/Theme-1/Team/Sierra.webp';
import john from '../../../assets/Theme-1/Team/John.webp';
import './AboutTeam.scss';

const PHOTOS = {
  ahmed,
  sanal,
  reynold,
  yupar,
  sadik,
  mizna,
  sinan,
  sierra,
  john,
};

const MIN_COPIES = 2;

export default function AboutTeam() {
  const sectionRef = useRef(null);
  const { sectionNum, label, members } = SITE_CONTENT.aboutPage.team;
  useInclineReveal(sectionRef);
  const copies = Math.max(MIN_COPIES, Math.ceil(8 / members.length));
  const row = Array.from({ length: copies }, () => members).flat();
  const track = [...row, ...row];

  return (
    <section ref={sectionRef} className="about-team" aria-labelledby="about-team-title">
      <h2 id="about-team-title" className="about-team__sr">
        Meet our team
      </h2>
      <AboutStrip index={sectionNum} label={label} tone="dark" />

      <ul className="about-team__sr">
        {members.map((member) => (
          <li key={member.id}>
            {member.name}, {member.role}
          </li>
        ))}
      </ul>

      <div className="about-team__marquee">
        <div className="about-team__track">
          {track.map((member, i) => (
            <figure key={`${member.id}-${i}`} className="about-team__card" aria-hidden="true">
              <img
                src={PHOTOS[member.id]}
                alt=""
                className="about-team__photo"
              />
              <figcaption className="about-team__caption">
                <span className="about-team__name">{member.name}</span>
                <span className="about-team__role">{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
