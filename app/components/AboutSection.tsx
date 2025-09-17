
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface AboutSectionProps {
  scrollY: number;
}

export default function AboutSection({ scrollY }: AboutSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8" 
      id="about"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 800) * 0.1)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div 
            className={`transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-blue-800 mb-6 sm:mb-8 leading-tight">
              Leading Energy
              <br />
              <span className="text-orange-600">Storage Innovation</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              We're pioneering the next generation of energy storage technology. Our advanced battery systems deliver unmatched performance, safety, and reliability for a sustainable energy future.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">Advanced Battery Technology</h3>
                  <p className="text-sm sm:text-base text-gray-600">Cutting-edge lithium-ion and solid-state battery systems with industry-leading energy density</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">Smart Grid Integration</h3>
                  <p className="text-sm sm:text-base text-gray-600">Seamless integration with renewable energy sources and intelligent grid management</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">Proven Reliability</h3>
                  <p className="text-sm sm:text-base text-gray-600">Over 15 years of experience with 99.9% system uptime and comprehensive warranty coverage</p>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12">
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base rounded-full"
              >
                Learn More About Us
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'
            }`}
          >
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20engineers%20and%20technicians%20working%20in%20modern%20energy%20storage%20facility%2C%20industrial%20battery%20manufacturing%20and%20testing%20environment%2C%20clean%20high-tech%20laboratory%20with%20advanced%20energy%20storage%20equipment%2C%20professional%20industrial%20photography%20with%20bright%20lighting%20and%20modern%20machinery&width=800&height=600&seq=energy-team&orientation=landscape"
                alt="Our energy storage team"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-top shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
