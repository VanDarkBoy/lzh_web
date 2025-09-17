
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface SustainabilityMetricsProps {
  scrollY: number;
}

const metrics = [
  {
    category: "Energy Performance",
    stats: [
      { label: "Average EUI Reduction", value: "65%", description: "compared to conventional buildings" },
      { label: "Renewable Energy Integration", value: "85%", description: "of projects include on-site generation" },
      { label: "Net-Zero Certifications", value: "12", description: "buildings achieved to date" }
    ],
    color: "emerald"
  },
  {
    category: "Environmental Impact",
    stats: [
      { label: "Embodied Carbon Reduction", value: "45%", description: "through material optimization" },
      { label: "Water Use Reduction", value: "40%", description: "via efficient fixtures and rainwater harvesting" },
      { label: "Waste Diversion Rate", value: "90%", description: "during construction phase" }
    ],
    color: "blue"
  },
  {
    category: "Health & Wellness",
    stats: [
      { label: "Indoor Air Quality", value: "100%", description: "of projects meet WELL standards" },
      { label: "Natural Daylight", value: "80%", description: "average daylight autonomy achieved" },
      { label: "Productivity Improvement", value: "25%", description: "reported by occupants" }
    ],
    color: "amber"
  }
];

const certificationStats = [
  { name: "LEED Platinum", count: 8, total: 15 },
  { name: "Passive House", count: 12, total: 15 },
  { name: "Living Building", count: 3, total: 15 },
  { name: "WELL Gold", count: 6, total: 15 }
];

export default function SustainabilityMetrics({ scrollY }: SustainabilityMetricsProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'border-emerald-500 bg-emerald-50',
      blue: 'border-blue-500 bg-blue-50',
      amber: 'border-amber-500 bg-amber-50'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gray-50 mb-16"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 5200) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
              Our
              <br />
              <span className="text-emerald-700">Impact</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Measurable results from our commitment to sustainable design excellence, 
              demonstrating the real-world impact of our methodology
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {metrics.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              ref={el => itemRefs.current[categoryIndex] = el}
              className={`bg-white p-6 sm:p-8 shadow-lg border-t-4 ${getColorClasses(category.color)} transition-all duration-700 transform hover:-translate-y-2 ${
                visibleItems.includes(categoryIndex)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-6 sm:mb-8">{category.category}</h3>

              <div className="space-y-6">
                {category.stats.map((stat, statIndex) => (
                  <div key={statIndex}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-3xl sm:text-4xl font-light text-gray-900">{stat.value}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{stat.label}</h4>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 sm:p-8 shadow-lg">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              <span className="text-emerald-700">Certification</span> Success Rate
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base px-4">
              Our track record of achieving the highest levels of third-party certification 
              across our portfolio of 15 completed projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certificationStats.map((cert, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[metrics.length + index] = el}
                className={`text-center p-4 sm:p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 ${
                  visibleItems.includes(metrics.length + index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(metrics.length + index) * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl font-light text-emerald-700 mb-2">
                  {cert.count}/{cert.total}
                </div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{cert.name}</h4>
                <div className="w-full bg-gray-200 h-2 mb-2">
                  <div 
                    className="bg-emerald-600 h-2 transition-all duration-1000"
                    style={{ 
                      width: visibleItems.includes(metrics.length + index) 
                        ? `${(cert.count / cert.total) * 100}%` 
                        : '0%' 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {Math.round((cert.count / cert.total) * 100)}% Success Rate
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
