
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DownloadHero from './DownloadHero';
import DownloadCenter from './DownloadCenter';

export default function DownloadPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DownloadHero scrollY={scrollY} />
      <DownloadCenter />
      <Footer />
    </div>
  );
}
