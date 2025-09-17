
'use client';

import { useInView } from 'react-intersection-observer';

interface ShopHeroProps {
  scrollY: number;
}

export default function ShopHero({ scrollY }: ShopHeroProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20sustainable%20building%20products%20showroom%20with%20clean%20white%20interior%2C%20professional%20product%20display%20areas%2C%20eco-friendly%20building%20materials%2C%20solar%20panels%2C%20energy%20systems%2C%20green%20technology%20products%20arranged%20elegantly%2C%20bright%20natural%20lighting%2C%20contemporary%20commercial%20space%20design&width=1920&height=1080&seq=shop-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 sm:mb-8 leading-tight">
            Green Building
            <br />
            <span className="text-emerald-400 font-medium">Product Store</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover premium sustainable building products and renewable energy solutions for your next project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
              <i className="ri-shopping-cart-line mr-2 w-5 h-5 flex items-center justify-center inline-flex"></i>
              Browse Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 whitespace-nowrap cursor-pointer">
              <i className="ri-phone-line mr-2 w-5 h-5 flex items-center justify-center inline-flex"></i>
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <i className="ri-arrow-down-line text-2xl w-6 h-6 flex items-center justify-center"></i>
      </div>
    </section>
  );
}
