
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  scrollY: number;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 0.5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20industrial%20energy%20storage%20facility%20with%20large%20battery%20systems%2C%20solar%20panels%2C%20and%20clean%20technology%20infrastructure%2C%20futuristic%20energy%20storage%20batteries%20in%20a%20high-tech%20warehouse%20setting%2C%20professional%20industrial%20photography%20with%20blue%20and%20white%20lighting%2C%20clean%20minimal%20background%20showcasing%20advanced%20energy%20storage%20technology&width=1920&height=1080&seq=energy-hero&orientation=landscape')`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent ${animationOffset}%, rgba(255,255,255,0.1) ${animationOffset + 5}%, transparent ${animationOffset + 10}%)`,
          backgroundSize: '200% 200%'
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white mb-6 sm:mb-8 leading-tight"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        >
          Powering the<br />
          <span className="font-normal text-blue-200">Energy Future</span>
        </h1>
        
        <p 
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 font-light max-w-2xl mx-auto px-4"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        >
          Advanced energy storage solutions for commercial, industrial, and residential applications. Reliable, efficient, and built for tomorrow.
        </p>
        
        <Link 
          href="#products"
          className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 bg-white text-blue-800 text-base sm:text-lg font-medium hover:bg-blue-50 transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        >
          Explore Our Products
          <i className="ri-arrow-right-line ml-2 w-5 h-5 flex items-center justify-center"></i>
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <i className="ri-arrow-down-line w-6 h-6 flex items-center justify-center"></i>
      </div>
    </section>
  );
}
