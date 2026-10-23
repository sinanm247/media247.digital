import AboutPage from '../Pages/AboutPage';
import ContactPage from '../Pages/ContactPage';
import HomePage from '../Pages/HomePage';
import ServicesPage from '../Pages/ServicesPage';
import WorkPage from '../Pages/WorkPage';

const routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/services',
        element: <ServicesPage />
    },
    {
        path: '/about',
        element: <AboutPage />
    },
    {
        path: '/work',
        element: <WorkPage />
    },
    {
        path: '/contact',
        element: <ContactPage />
    }
]

export default routes;