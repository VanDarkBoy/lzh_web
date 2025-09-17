
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ToolsSectionProps {
  scrollY: number;
}

const certifications = [
  { name: "LEED", description: "Leadership in Energy and Environmental Design", level: "Platinum" },
  { name: "BREEAM", description: "Building Research Establishment Environmental Assessment Method", level: "Outstanding" },
  { name: "Passive House", description: "Ultra-low energy building standard", level: "Certified" },
  { name: "Living Building", description: "Regenerative design framework", level: "Challenge" },
  { name: "WELL", description: "Health and wellness in buildings", level: "Gold" },
  { name: "ENERGY STAR", description: "Energy efficiency certification", level: "Most Efficient" }
];

export default function ToolsSection({ scrollY }: ToolsSectionProps) {
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
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gray-50"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 2800) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
              <span className="text-emerald-700">Certifications</span> & Standards
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              We design to the highest environmental standards and pursue third-party certifications 
              that validate our commitment to sustainability and performance
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`border border-gray-200 p-4 sm:p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-300 ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">{cert.name}</h4>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium self-start sm:self-auto">
                    {cert.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
