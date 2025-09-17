
'use client';

import { useInView } from 'react-intersection-observer';

interface ProductHeroProps {
  scrollY: number;
}

export default function ProductHero({ scrollY }: ProductHeroProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20lithium%20battery%20energy%20storage%20systems%20in%20professional%20warehouse%20setting%2C%20rows%20of%20LiFePO4%20battery%20modules%20and%20ESS%20units%2C%20clean%20industrial%20environment%20with%20blue%20and%20white%20color%20scheme%2C%20advanced%20battery%20technology%20display%20with%20safety%20equipment%20and%20monitoring%20systems%2C%20professional%20lighting%20highlighting%20battery%20products&width=1920&height=1080&seq=products-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1500 ${ 
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white mb-6 sm:mb-8 leading-tight">
            储能电池
            <br />
            <span className="text-blue-400">与系统</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            采用 LiFePO₄ 技术的高安全性储能解决方案
            <br />
            涵盖家用、商用与房车应用的模块化设计
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
              <span>高安全性</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
              <span>长寿命</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-stack-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
              <span>模块化</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-leaf-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
              <span>环保设计</span>
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
