
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CaseStudySectionProps {
  scrollY: number;
}

const caseStudy = {
  title: "Net-Zero Office Complex",
  location: "Portland, Oregon",
  year: "2023",
  size: "45,000 sq ft",
  description: "A flagship project demonstrating our integrated approach to sustainable design, achieving net-zero energy consumption through passive strategies and renewable systems.",
  challenge: "Create a high-performance office building that produces as much energy as it consumes while providing a healthy, productive work environment for 200+ employees.",
  solution: "Integrated design approach combining passive house principles, advanced building systems, and renewable energy generation with extensive post-occupancy monitoring.",
  results: [
    { metric: "Energy Use Intensity", value: "12 kBtu/sf/yr", benchmark: "65% below baseline" },
    { metric: "Daylight Autonomy", value: "85%", benchmark: "Target: 75%" },
    { metric: "Indoor Air Quality", value: "Excellent", benchmark: "WELL Gold Standard" },
    { metric: "Embodied Carbon", value: "45% Reduction", benchmark: "vs conventional construction" }
  ],
  images: [
    {
      url: "https://readdy.ai/api/search-image?query=modern%20sustainable%20office%20building%20exterior%20with%20solar%20panels%20and%20green%20facade%2C%20natural%20materials%20and%20large%20windows%2C%20net-zero%20energy%20architecture%2C%20professional%20photography%2C%20clean%20lines%20and%20eco-friendly%20design%20elements&width=800&height=600&seq=case-study-1&orientation=landscape",
      caption: "Building exterior showcasing integrated solar array and natural ventilation systems"
    },
    {
      url: "https://readdy.ai/api/search-image?query=sustainable%20office%20interior%20with%20natural%20daylighting%20and%20plants%2C%20open%20collaborative%20workspace%20with%20wooden%20elements%2C%20energy%20efficient%20lighting%20and%20green%20building%20features%2C%20modern%20eco-friendly%20office%20design&width=800&height=600&seq=case-study-2&orientation=landscape",
      caption: "Interior spaces designed for optimal daylighting and natural ventilation"
    },
    {
      url: "https://readdy.ai/api/search-image?query=building%20performance%20monitoring%20dashboard%20with%20energy%20consumption%20graphs%20and%20sustainability%20metrics%2C%20digital%20displays%20showing%20real-time%20environmental%20data%2C%20green%20building%20analytics%20and%20smart%20systems%20interface&width=800&height=600&seq=case-study-3&orientation=landscape",
      caption: "Real-time performance monitoring system tracking energy and environmental metrics"
    }
  ]
};

export default function CaseStudySection({ scrollY }: CaseStudySectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section 
      id="case-study"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 3200) * 0.03)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
              Case
              <br />
              <span className="text-emerald-700">Study</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              A detailed look at how our methodology delivered exceptional results 
              in a complex commercial project
            </p>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="bg-gray-50 p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">{caseStudy.title}</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    {caseStudy.location}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-calendar-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    {caseStudy.year}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-building-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    {caseStudy.size}
                  </div>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{caseStudy.description}</p>
              </div>
              
              <div className="relative">
                <img
                  src={caseStudy.images[activeImage].url}
                  alt="Case study"
                  className="w-full h-64 sm:h-80 object-cover object-top shadow-xl"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 text-white p-3 text-sm">
                    {caseStudy.images[activeImage].caption}
                  </div>
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                  {caseStudy.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                        activeImage === index ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div>
              <h4 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4 sm:mb-6">The Challenge</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{caseStudy.challenge}</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4 sm:mb-6">Our Solution</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{caseStudy.solution}</p>
            </div>
          </div>

          <div>
            <h4 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8 text-center">
              <span className="text-emerald-700">Performance</span> Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 shadow-lg border-l-4 border-emerald-500">
                  <h5 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{result.metric}</h5>
                  <div className="text-2xl sm:text-3xl font-light text-emerald-700 mb-2">{result.value}</div>
                  <p className="text-sm text-gray-600">{result.benchmark}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
