import { useEffect } from 'react';

const AnalyticsTracker = () => {
  useEffect(() => {
    // Load analytics configuration from backend
    const loadAnalyticsConfig = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/analytics-config`);
        if (response.ok) {
          const config = await response.json();
          
          // Load Google Analytics if configured
          if (config.googleAnalyticsId) {
            loadGoogleAnalytics(config.googleAnalyticsId);
          }
          
          // Load Google Tag Manager if configured
          if (config.googleTagManagerId) {
            loadGoogleTagManager(config.googleTagManagerId);
          }
        }
      } catch (error) {
        console.error('Error loading analytics config:', error);
      }
    };

    loadAnalyticsConfig();
  }, []);

  const loadGoogleAnalytics = (measurementId) => {
    // Avoid loading if already loaded
    if (window.gtag) return;

    // Create Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  };

  const loadGoogleTagManager = (containerId) => {
    // Avoid loading if already loaded
    if (window.google_tag_manager) return;

    // Create Google Tag Manager script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);

    window.google_tag_manager = true;
  };

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;