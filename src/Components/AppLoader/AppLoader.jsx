import { useEffect, useRef } from 'react';
import "./AppLoader.scss";
// AppLoader renders before the page is ready — use a static import for the logo.
// Theme-1 logo is used as the default loader asset.
import logo from "../../assets/Theme-1/Logo/M247D-Logo.png";

export default function AppLoader({ isVisible, showVideo = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !showVideo || !videoRef.current) return;

    // Video mode: always restart from frame 1.
    videoRef.current.currentTime = 0;
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [isVisible, showVideo]);

  return (
    <div className={`app-loader-container ${isVisible ? "show" : "hide"}`}>
      {showVideo ? (
        <video
          ref={videoRef}
          src={logo}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="logo"
        />
      ) : (
        <img src={logo} alt="Elite Paws" className="logo logo-image" />
      )}
    </div>
  );
}
