'use client';

interface ProductListHeroProps {
  scrollY: number;
}

export default function ProductListHero({ scrollY }: ProductListHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50" 
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Clean%20modern%20energy%20storage%20facility%20with%20multiple%20battery%20systems%20arranged%20in%20professional%20display%2C%20industrial%20ESS%20product%20showcase%20with%20white%20background%2C%20professional%20product%20photography%20for%20lithium%20battery%20storage%20systems&width=1920&height=1080&seq=product-list-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${scrollY * 0.5}px)`
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            产品列表
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            探索 Lithium Valley 完整的储能产品系列，从家用到工业级解决方案
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              <span>住宅储能系统</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
              <span>工商业ESS</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
              <span>房车储能</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
              <span>动力电池</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}