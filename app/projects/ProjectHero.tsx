
'use client';

interface ProjectHeroProps {
  scrollY: number;
}

export default function ProjectHero({ scrollY }: ProjectHeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Minimalist%20modern%20sustainable%20architecture%20building%20with%20clean%20lines%20and%20natural%20materials%2C%20single%20elegant%20eco-friendly%20structure%20with%20glass%20and%20wood%20elements%2C%20simple%20composition%20with%20natural%20lighting%2C%20architectural%20photography%20with%20clean%20background%2C%20professional%20and%20serene%20design%20aesthetic%2C%20contemporary%20green%20building%20design&width=1920&height=1080&seq=projects-hero-simple&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>
      
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white mb-6 sm:mb-8 leading-tight">
          Our
          <br />
          <span className="text-emerald-400">Projects</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover our portfolio of sustainable architecture that harmonizes with nature while meeting modern living needs
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
              50+
            </div>
            <div className="text-white/80 text-sm sm:text-base lg:text-lg font-light tracking-wide">
              Completed Projects
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
              15
            </div>
            <div className="text-white/80 text-sm sm:text-base lg:text-lg font-light tracking-wide">
              Countries
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
              85%
            </div>
            <div className="text-white/80 text-sm sm:text-base lg:text-lg font-light tracking-wide">
              Energy Savings
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <i className="ri-arrow-down-line text-white text-2xl w-6 h-6 flex items-center justify-center"></i>
        </div>
      </div>
    </section>
  );
}
