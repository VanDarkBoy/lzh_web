
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DownloadHero from './DownloadHero';
import DownloadCenter from './DownloadCenter';
import {
  DownloadPageContent,
  fallbackDownloadPageContent,
  normalizeDownloadPageContent
} from './content';

export default function DownloadPage() {
  const [scrollY, setScrollY] = useState(0);
  const [content, setContent] = useState<DownloadPageContent>(fallbackDownloadPageContent);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      if (!process.env.NEXT_PUBLIC_API_BASE) {
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/DownloadPageContent`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to load download page content: ${response.status}`);
        }

        const data = await response.json();
        setContent(normalizeDownloadPageContent(data));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Failed to fetch download page content', error);
      }
    };

    fetchContent();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DownloadHero scrollY={scrollY} content={content.hero} />
      <DownloadCenter messages={content.messages} />
      <Footer />
    </div>
  );
}
