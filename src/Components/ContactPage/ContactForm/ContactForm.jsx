import { useState } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
import { enterStyle } from '../../Common/Entrance/enterStyle';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './ContactForm.scss';

const photo = THEME_ASSETS['theme-1'].images.image2;

const EMPTY = {
  firstName: '',
  lastName: '',
  category: '',
  email: '',
  message: '',
};

export default function ContactForm() {
  const { title, intro, submit, email, categoryPlaceholder, emailPlaceholder, messagePlaceholder } =
    SITE_CONTENT.contactPage;
  const categories = SITE_CONTENT.services.list.map((item) => item.title);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.firstName.trim()) next.firstName = 'Add a first name.';
    if (!values.lastName.trim()) next.lastName = 'Add a last name.';
    if (!values.email.trim()) next.email = 'Add an email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'That email does not look complete.';
    if (!values.message.trim()) next.message = 'Add a short note about the job.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `Project from ${values.firstName.trim()} ${values.lastName.trim()}`;
    const body = [
      `Name: ${values.firstName.trim()} ${values.lastName.trim()}`,
      `Email: ${values.email.trim()}`,
      values.category && `Category: ${values.category}`,
      '',
      values.message.trim(),
    ].filter(Boolean).join('\n');

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact-form" aria-labelledby="contact-title">
      <Navbar variant="hero" />

      <div className="contact-form__layout">
        <div className="contact-form__media enter-rise" style={enterStyle(100, 70, 1170, 'spring')}>
          <img
            src={photo}
            alt="A cinema camera on a studio slider"
            className="contact-form__photo enter-rise__in"
          />
        </div>

        <form className="contact-form__panel" onSubmit={onSubmit} noValidate>
          <h1 id="contact-title" className="contact-form__title enter-rise" style={enterStyle(100, 20, 1170, 'spring')}>
            <span className="enter-rise__in">
              {title}
              <span className="contact-form__mark" aria-hidden="true">”</span>
            </span>
          </h1>
          <p className="contact-form__intro enter-rise" style={enterStyle(200, 20, 1170, 'spring')}>
            <span className="enter-rise__in">{intro}</span>
          </p>

          <div className="contact-form__grid">
            <label className="contact-form__field enter-rise" style={enterStyle(300, 20, 1170, 'spring')}>
              <span className="enter-rise__in">
              <span>First Name*</span>
              <input
                name="firstName"
                autoComplete="given-name"
                value={values.firstName}
                onChange={setField('firstName')}
                aria-invalid={Boolean(errors.firstName)}
              />
              {errors.firstName && <small>{errors.firstName}</small>}
              </span>
            </label>

            <label className="contact-form__field enter-rise" style={enterStyle(400, 20, 1170, 'spring')}>
              <span className="enter-rise__in">
              <span>Last Name*</span>
              <input
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                onChange={setField('lastName')}
                aria-invalid={Boolean(errors.lastName)}
              />
              {errors.lastName && <small>{errors.lastName}</small>}
              </span>
            </label>

            <label className="contact-form__field enter-rise" style={enterStyle(500, 20, 1170, 'spring')}>
              <span className="enter-rise__in">
              <span>Category</span>
              <select
                name="category"
                value={values.category}
                onChange={setField('category')}
                data-empty={values.category ? 'false' : 'true'}
              >
                <option value="">{categoryPlaceholder}</option>
                {categories.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              </span>
            </label>

            <label className="contact-form__field enter-rise" style={enterStyle(600, 20, 1170, 'spring')}>
              <span className="enter-rise__in">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder={emailPlaceholder}
                value={values.email}
                onChange={setField('email')}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <small>{errors.email}</small>}
              </span>
            </label>

            <label className="contact-form__field contact-form__field--wide enter-rise" style={enterStyle(700, 20, 1170, 'spring')}>
              <span className="enter-rise__in">
              <span>Message</span>
              <textarea
                name="message"
                rows={4}
                placeholder={messagePlaceholder}
                value={values.message}
                onChange={setField('message')}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <small>{errors.message}</small>}
              </span>
            </label>
          </div>

          <div className="enter-rise" style={enterStyle(800, 20, 1170, 'spring')}>
            <button type="submit" className="contact-form__submit enter-rise__in">{submit}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
