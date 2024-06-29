import '../styles/colors.css'; // Global colors
import '../styles/index.css';  // Global index styles
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { lightenColor, darkenColor } from '../utils/colorUtils';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import AccessibilityPanel from '../components/AccessibilityPanel';

const setDynamicColors = () => {
  const root = document.documentElement;

  const colors = [
    { name: 'primary', color: getComputedStyle(root).getPropertyValue('--color-primary') },
    { name: 'complementary', color: getComputedStyle(root).getPropertyValue('--color-complementary') },
    { name: 'analogous', color: getComputedStyle(root).getPropertyValue('--color-analogous') },
    { name: 'triadic', color: getComputedStyle(root).getPropertyValue('--color-triadic') },
  ];

  colors.forEach(({ name, color }) => {
    root.style.setProperty(`--color-${name}-light`, lightenColor(color.trim(), 20));
    root.style.setProperty(`--color-${name}-dark`, darkenColor(color.trim(), 20));
  });
};

function MyApp({ Component, pageProps }) {
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);

  const toggleAccessibilityPanel = () => {
    setIsAccessibilityPanelOpen(!isAccessibilityPanelOpen);
  };

  useEffect(() => {
    setDynamicColors();
  }, []);

  return (
    <>
      
      <header className="header">
        <Menu toggleAccessibilityPanel={toggleAccessibilityPanel} />
      </header>
      <AccessibilityPanel isOpen={isAccessibilityPanelOpen} togglePanel={toggleAccessibilityPanel} />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default MyApp;
