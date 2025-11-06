'use client';

import { useInView } from 'react-intersection-observer';
import type { ProductsHeroContent } from './types';

interface ProductsHeroProps {
  scrollY: number;
  content: ProductsHeroContent | null;
}


export default function ProductsHero({ scrollY, content }: ProductsHeroProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!content) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${content.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1500 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
              {content.title.main}
              <span className="text-blue-400">{content.title.highlight}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              {content.tagline.main}
              <span className="text-blue-300">{content.tagline.highlight}</span>
            </p>

            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {content.subtitle.main}
              <span className="text-blue-700">{content.subtitle.highlight}</span>
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {content.stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              {content.features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-2">
                  <i
                    className={`${feature.icon} w-5 h-5 flex items-center justify-center text-blue-400`}
                    aria-hidden="true"
                  ></i>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i
          className={`${content.scrollIndicatorIcon} w-6 h-6 flex items-center justify-center text-white text-2xl`}
        ></i>
      </div>
    </section>
  );
}
