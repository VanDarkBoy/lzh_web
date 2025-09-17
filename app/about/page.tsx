'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from './AboutHero';
import CompanyVision from './CompanyVision';
import GlobalPresence from './GlobalPresence';
import CompanyHistory from './CompanyHistory';
import CertificatesSection from './CertificatesSection';
import CompanyCapabilities from './CompanyCapabilities';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 设置页面标题和描述
    document.title = "关于锂谷 | 全球储能解决方案与认证实力";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '锂谷（Lithium Valley）持有多项国际权威认证，在中国、越南、尼日利亚设有工厂，并在西班牙、匈牙利、波兰、南非、肯尼亚、澳大利亚、巴西、巴基斯坦、印度、坦桑尼亚设有分部或海外仓，提供高安全、模块化的储能解决方案。');
    }
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutHero scrollY={scrollY} />
        <CompanyVision />
        <GlobalPresence />
        <CompanyCapabilities scrollY={0} />
        <CertificatesSection />
        <CompanyHistory />
      </main>
      <Footer />
    </div>
  );
}