import { useState } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
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
        <div className="contact-form__media">
          <img
            src={photo}
            alt="A cinema camera on a studio slider"
            className="contact-form__photo"
          />
        </div>

        <form className="contact-form__panel" onSubmit={onSubmit} noValidate>
          <h1 id="contact-title" className="contact-form__title">
            {title}
            <span className="contact-form__mark" aria-hidden="true">”</span>
          </h1>
          <p className="contact-form__intro">{intro}</p>

          <div className="contact-form__grid">
            <label className="contact-form__field">
              <span>First Name*</span>
              <input
                name="firstName"
                autoComplete="given-name"
                value={values.firstName}
                onChange={setField('firstName')}
                aria-invalid={Boolean(errors.firstName)}
              />
              {errors.firstName && <small>{errors.firstName}</small>}
            </label>

            <label className="contact-form__field">
              <span>Last Name*</span>
              <input
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                onChange={setField('lastName')}
                aria-invalid={Boolean(errors.lastName)}
              />
              {errors.lastName && <small>{errors.lastName}</small>}
            </label>

            <label className="contact-form__field">
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
            </label>

            <label className="contact-form__field">
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
            </label>

            <label className="contact-form__field contact-form__field--wide">
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
            </label>
          </div>

          <button type="submit" className="contact-form__submit">{submit}</button>
        </form>
      </div>
    </section>
  );
}
