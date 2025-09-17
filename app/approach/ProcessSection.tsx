
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ProcessSectionProps {
  scrollY: number;
}

const phases = [
  {
    phase: "01",
    title: "Discovery & Research",
    duration: "2-4 weeks",
    description: "Comprehensive site analysis, stakeholder interviews, and environmental assessment to understand context and constraints.",
    activities: [
      "Site surveys and soil analysis",
      "Climate data collection",
      "Community engagement sessions",
      "Regulatory framework review"
    ],
    deliverables: "Site Analysis Report, Stakeholder Requirements, Sustainability Goals",
    image: "https://readdy.ai/api/search-image?query=architects%20conducting%20site%20analysis%20with%20measuring%20tools%20and%20notebooks%2C%20natural%20outdoor%20environment%20with%20trees%20and%20landscape%2C%20professional%20documentation%20process%2C%20sustainable%20architecture%20planning%2C%20detailed%20environmental%20assessment%20work&width=600&height=400&seq=process-1&orientation=landscape"
  },
  {
    phase: "02",
    title: "Concept Development",
    duration: "3-6 weeks",
    description: "Iterative design exploration focused on passive strategies, material selection, and integration with natural systems.",
    activities: [
      "Bioclimatic design strategies",
      "Material lifecycle assessment",
      "Energy modeling simulations",
      "Stakeholder design workshops"
    ],
    deliverables: "Concept Drawings, Performance Targets, Material Strategy",
    image: "https://readdy.ai/api/search-image?query=architectural%20design%20studio%20with%20sketches%20and%203D%20models%20on%20tables%2C%20sustainable%20building%20concepts%20and%20green%20design%20drawings%2C%20architects%20collaborating%20on%20eco-friendly%20building%20plans%2C%20natural%20materials%20samples%20and%20color%20palettes%2C%20creative%20workspace%20with%20plants&width=600&height=400&seq=process-2&orientation=landscape"
  },
  {
    phase: "03",
    title: "Design Development",
    duration: "4-8 weeks",
    description: "Detailed design refinement using advanced simulation tools to optimize performance and validate sustainability metrics.",
    activities: [
      "Advanced energy modeling",
      "Structural optimization",
      "Systems integration design",
      "Cost-benefit analysis"
    ],
    deliverables: "Technical Drawings, Performance Analysis, Cost Estimates",
    image: "https://readdy.ai/api/search-image?query=modern%20architectural%20office%20with%20computer%20screens%20showing%20building%20energy%20simulation%20software%2C%20technical%20drawings%20and%203D%20models%2C%20architects%20analyzing%20sustainable%20building%20performance%20metrics%2C%20advanced%20modeling%20tools%20and%20environmental%20data%20visualization&width=600&height=400&seq=process-3&orientation=landscape"
  },
  {
    phase: "04",
    title: "Documentation & Permits",
    duration: "2-4 weeks",
    description: "Comprehensive construction documentation and regulatory approval process with emphasis on green building certifications.",
    activities: [
      "Construction drawings",
      "Permit applications",
      "Green certification submissions",
      "Contractor selection support"
    ],
    deliverables: "Construction Documents, Permits, Certification Applications",
    image: "https://readdy.ai/api/search-image?query=architectural%20documentation%20workspace%20with%20detailed%20technical%20drawings%20and%20blueprints%2C%20green%20building%20certification%20documents%2C%20professional%20architects%20reviewing%20construction%20plans%2C%20sustainable%20building%20codes%20and%20permits%2C%20organized%20planning%20materials&width=600&height=400&seq=process-4&orientation=landscape"
  },
  {
    phase: "05",
    title: "Construction Support",
    duration: "Ongoing",
    description: "Active construction administration ensuring design intent is maintained and sustainability goals are achieved.",
    activities: [
      "Regular site inspections",
      "Material verification",
      "Quality assurance testing",
      "Performance commissioning"
    ],
    deliverables: "Site Reports, Quality Documentation, Performance Verification",
    image: "https://readdy.ai/api/search-image?query=construction%20site%20of%20sustainable%20green%20building%20with%20architects%20supervising%20work%2C%20eco-friendly%20building%20materials%20and%20solar%20panels%20being%20installed%2C%20professional%20construction%20monitoring%2C%20sustainable%20building%20techniques%20and%20quality%20control%20processes&width=600&height=400&seq=process-5&orientation=landscape"
  }
];

export default function ProcessSection({ scrollY }: ProcessSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [visiblePhases, setVisiblePhases] = useState<number[]>([]);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = phaseRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisiblePhases(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    phaseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="process"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gray-50" 
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 1600) * 0.05)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
              Design
              <br />
              <span className="text-emerald-700">Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              A structured five-phase approach that ensures thorough analysis, creative exploration, 
              and precise execution of sustainable design solutions
            </p>
          </div>
        </div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {phases.map((phase, index) => (
            <div
              key={index}
              ref={el => phaseRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visiblePhases.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="w-full lg:w-1/2">
                  <img
                    src={phase.image}
                    alt={phase.title}
                    className="w-full h-64 sm:h-80 object-cover object-top shadow-2xl hover:shadow-3xl transition-shadow duration-500"
                  />
                </div>
                
                <div className="w-full lg:w-1/2">
                  <div className="max-w-xl mx-auto lg:mx-0">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                      <span className="text-5xl sm:text-6xl font-light text-emerald-200 mb-4 sm:mb-0 sm:mr-4">{phase.phase}</span>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-medium text-gray-900">{phase.title}</h3>
                        <p className="text-emerald-600 font-medium">{phase.duration}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                      {phase.description}
                    </p>
                    
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Key Activities:</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start text-gray-600 text-sm sm:text-base">
                            <i className="ri-check-line w-5 h-5 flex items-center justify-center text-emerald-600 mr-3 mt-0.5 flex-shrink-0"></i>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-emerald-50 p-4 border-l-4 border-emerald-500">
                      <h4 className="font-medium text-gray-900 mb-2">Deliverables:</h4>
                      <p className="text-gray-700 text-sm sm:text-base">{phase.deliverables}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
