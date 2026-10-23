import { Fragment, useEffect, useState } from 'react';
import AppRouter from './Components/AppRouter/AppRouter';
import AppLoader from './Components/AppLoader/AppLoader';
import Footer from './Components/Common/Footer/Footer';
// import ThemeToggle from './Components/Common/ThemeToggle/ThemeToggle';
import { AppLoaderContext } from './Context/AppLoaderContext';
import { SectionThemeProvider } from './Context/SectionThemeContext';
import { ThemeProvider } from './Context/ThemeContext';
import { APP_LOADER_DURATION_MS } from './Constants/appLoader';
import routes from './Routes/routes';

function App() {
  const [pageLoading, setPageLoading] = useState(true);
  const loaderDurationMs = APP_LOADER_DURATION_MS;
  const showLoaderVideo = false;

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), loaderDurationMs);
    return () => clearTimeout(timer);
  }, [loaderDurationMs]);

  return (
    <AppLoaderContext.Provider value={{ isPageLoading: pageLoading, loaderDurationMs }}>
      <ThemeProvider>
        <SectionThemeProvider>
          <AppLoader isVisible={pageLoading} showVideo={showLoaderVideo} />
          <div className={`app-shell ${!pageLoading ? 'is-ready' : ''}`}>
            <Fragment>
              <AppRouter routes={routes} />
              <Footer />
            </Fragment>
          </div>
          {/* <ThemeToggle /> */}
        </SectionThemeProvider>
      </ThemeProvider>
    </AppLoaderContext.Provider>
  );
}

export default App;
