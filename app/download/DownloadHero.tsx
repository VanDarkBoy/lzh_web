
'use client';

import { DownloadPageContent } from './types';

interface DownloadHeroProps {
  content: DownloadPageContent['hero'];
}

export default function DownloadHero({content }: DownloadHeroProps) {
  const highlightColorClasses = ['bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-emerald-400'];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-green-50"
      style={{
        backgroundImage: `url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/60 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{content.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">{content.subtitle}</p>

          <div className="flex flex-wrap justify-center gap-6 text-lg">
            {content.highlights.map((highlight, index) => {
              const colorClass = highlightColorClasses[index % highlightColorClasses.length];
              return (
                <div key={`${highlight}-${index}`} className="flex items-center">
                  <div className={`w-3 h-3 ${colorClass} rounded-full mr-3`}></div>
                  <span>{highlight}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
