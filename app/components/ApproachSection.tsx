
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ApproachSectionProps {
  scrollY: number;
}

const advantages = [
  {
    number: "01",
    title: "Advanced Safety Systems",
    description: "Multi-layer protection with thermal management, fire suppression, and real-time monitoring to ensure maximum safety and reliability.",
    icon: "ri-shield-check-line"
  },
  {
    number: "02",
    title: "High Energy Density",
    description: "Industry-leading energy density with compact design, maximizing storage capacity while minimizing footprint requirements.",
    icon: "ri-battery-charge-line"
  },
  {
    number: "03",
    title: "Smart Management",
    description: "AI-powered battery management system with predictive analytics, remote monitoring, and automated optimization capabilities.",
    icon: "ri-brain-line"
  },
  {
    number: "04",
    title: "Long Lifecycle",
    description: "Extended battery life with 15+ year warranty, low degradation rates, and comprehensive maintenance support programs.",
    icon: "ri-time-line"
  }
];

export default function ApproachSection({ scrollY }: ApproachSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSteps(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8" 
      id="advantages"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 2400) * 0.03)}px)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
            Why Choose
            <br />
            <span className="text-blue-700">Our Solutions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Our energy storage systems deliver superior performance, safety, and value through innovative technology and proven engineering excellence
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-blue-200 transform md:-translate-x-px"></div>
          
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                ref={el => stepRefs.current[index] = el}
                className={`relative transition-all duration-1000 ${ 
                  visibleSteps.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex flex-col md:flex-row items-start ${ 
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className={`w-full md:w-1/2 ${ 
                    index % 2 === 0 ? 'md:pr-8 lg:pr-16' : 'md:pl-8 lg:pl-16'
                  }`}>
                    <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-500 ml-8 sm:ml-12 md:ml-0">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 flex items-center justify-center mr-3 sm:mr-4">
                          <i className={`${advantage.icon} w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-blue-700 text-xl sm:text-2xl`}></i>
                        </div>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-blue-200">{advantage.number}</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-3 sm:mb-4">
                        {advantage.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-4 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full transform md:-translate-x-2 mt-6 sm:mt-8"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-12">
          <Link href="/approach">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer w-full sm:w-auto rounded-full">
              View Our Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
