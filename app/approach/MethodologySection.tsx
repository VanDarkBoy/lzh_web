
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface MethodologySectionProps {
  scrollY: number;
}

const principles = [
  {
    title: "Biomimetic Design",
    description: "Learning from nature's 3.8 billion years of R&D to create efficient, resilient building systems that work in harmony with natural processes.",
    icon: "ri-leaf-line",
    color: "emerald",
    stats: "40% Energy Reduction"
  },
  {
    title: "Circular Economy",
    description: "Designing buildings as material banks where every component can be disassembled, reused, or recycled at end of life.",
    icon: "ri-recycle-line",
    color: "blue",
    stats: "90% Material Recovery"
  },
  {
    title: "Passive House Standards",
    description: "Ultra-low energy buildings that maintain comfortable conditions year-round with minimal heating and cooling needs.",
    icon: "ri-home-4-line",
    color: "amber",
    stats: "75% Less Energy Use"
  },
  {
    title: "Biophilic Integration",
    description: "Incorporating natural elements, patterns, and processes to enhance human wellbeing and connection to nature.",
    icon: "ri-plant-line",
    color: "green",
    stats: "25% Productivity Boost"
  },
  {
    title: "Climate Adaptation",
    description: "Future-proofing buildings against climate change impacts through resilient design and adaptive strategies.",
    icon: "ri-cloudy-line",
    color: "indigo",
    stats: "50 Year Resilience"
  },
  {
    title: "Social Impact",
    description: "Creating spaces that foster community, equity, and cultural expression while addressing local needs and priorities.",
    icon: "ri-community-line",
    color: "purple",
    stats: "Community Centered"
  }
];

export default function MethodologySection({ scrollY }: MethodologySectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700',
      blue: 'border-blue-500 bg-blue-50 text-blue-700',
      amber: 'border-amber-500 bg-amber-50 text-amber-700',
      green: 'border-green-500 bg-green-50 text-green-700',
      indigo: 'border-indigo-500 bg-indigo-50 text-indigo-700',
      purple: 'border-purple-500 bg-purple-50 text-purple-700'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };


  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gray-50"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 800) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
              Core
              <br />
              <span className="text-emerald-700">Principles</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Six fundamental principles that guide every aspect of our design process,
              ensuring buildings that are not just sustainable, but regenerative for both people and planet
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
                // @ts-ignore
              ref={el => cardRefs.current[index] = el}
              className={`bg-white p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 h-full flex flex-col ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 border-2 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 ${getColorClasses(principle.color)}`}>
                  <i className={`${principle.icon} w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xl sm:text-2xl`}></i>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full self-start">
                  {principle.stats}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4">
                {principle.title}
              </h3>

              <p className="text-gray-600 leading-relaxed flex-1 text-sm sm:text-base">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
