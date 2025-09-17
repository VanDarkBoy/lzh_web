'use client';

interface ProjectSouthHeroProps {
  scrollY: number;
}

export default function ProjectSouthHero({ scrollY }: ProjectSouthHeroProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-emerald-800 via-teal-700 to-green-800 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Abstract%20geometric%20pattern%20with%20sustainable%20energy%20symbols%2C%20clean%20modern%20design%20with%20flowing%20lines%20and%20nature-inspired%20elements%2C%20minimalist%20graphic%20design%20with%20green%20and%20blue%20tones%2C%20professional%20business%20background%20pattern%2C%20subtle%20texture%20design&width=1920&height=600&seq=south-hero-pattern&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
          <i className="ri-leaf-line text-emerald-300 mr-2 w-5 h-5 flex items-center justify-center"></i>
          <span className="text-emerald-200 text-sm font-medium">Southern Region Portfolio</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Project
          <span className="block text-emerald-300">South</span>
        </h1>
        
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Specialized sustainable architecture solutions for tropical and subtropical climates, featuring innovative cooling systems and weather-resistant designs
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-300 mb-2">25+</div>
            <div className="text-white/80 text-sm font-light">Tropical Projects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-300 mb-2">12</div>
            <div className="text-white/80 text-sm font-light">Southern States</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-300 mb-2">60%</div>
            <div className="text-white/80 text-sm font-light">Cooling Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-300 mb-2">100%</div>
            <div className="text-white/80 text-sm font-light">Hurricane Resistant</div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto text-gray-50">
          <path d="M0,0V120H1200V0C1200,0 900,60 600,60C300,60 0,0 0,0Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}