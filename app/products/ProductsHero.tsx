
'use client';

import { useInView } from 'react-intersection-observer';

interface ProductsHeroProps {
  scrollY: number;
}

export default function ProductsHero({ scrollY }: ProductsHeroProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20energy%20storage%20facility%20with%20rows%20of%20lithium%20battery%20systems%2C%20professional%20warehouse%20with%20LiFePO4%20battery%20modules%20and%20ESS%20units%20arranged%20systematically%2C%20clean%20industrial%20environment%20with%20blue%20and%20white%20corporate%20branding%2C%20advanced%20battery%20technology%20showcase%20with%20safety%20monitoring%20equipment%20and%20digital%20displays%2C%20bright%20professional%20lighting&width=1920&height=1080&seq=products-main-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1500 ${ 
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
              储能电池<span className="text-blue-400">与系统</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              家用与商用 ESS 解决方案，<span className="text-blue-300">采用 LiFePO₄ 技术，高安全性与长寿命</span>
            </p>

            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              主推<span className="text-blue-700">产品</span>
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-2">6000+</div>
                <div className="text-sm text-white/80">循环寿命</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                <div className="text-sm text-white/80">年使用寿命</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                <div className="text-sm text-white/80">系统效率</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-2">IP65</div>
                <div className="text-sm text-white/80">防护等级</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
                <span>高安全性</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-stack-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
                <span>模块化设计</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-leaf-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
                <span>环保材料</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-brain-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
                <span>智能管理</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line w-6 h-6 flex items-center justify-center text-white text-2xl"></i>
      </div>
    </section>
  );
}
