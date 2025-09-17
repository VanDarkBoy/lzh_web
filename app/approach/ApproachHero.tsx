
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ApproachHeroProps {
  scrollY: number;
}

export default function ApproachHero({ scrollY }: ApproachHeroProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20sustainable%20architecture%20studio%20workspace%20with%20architects%20working%20on%20green%20building%20designs%2C%20natural%20lighting%20through%20large%20windows%2C%20plants%20and%20eco-friendly%20materials%2C%20professional%20clean%20environment%20with%20drafting%20tables%20and%20computer%20workstations%2C%20minimalist%20aesthetic%20with%20wooden%20elements%20and%20concrete%20floors%2C%20inspiring%20creative%20atmosphere&width=1920&height=1080&seq=approach-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1500 ${ 
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white mb-6 sm:mb-8 leading-tight">
            Our Design
            <br />
            <span className="text-emerald-400">Methodology</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            A comprehensive approach to sustainable architecture that integrates environmental stewardship, 
            innovative technology, and human-centered design principles
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line w-6 h-6 flex items-center justify-center text-white text-2xl"></i>
      </div>
    </section>
  );
}
