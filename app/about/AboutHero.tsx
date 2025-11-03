'use client';

interface HeroStatistic {
  value: string;
  label: string;
}

export interface HeroContent {
  title: string;
  description: string;
  stats: HeroStatistic[];
  affiliation: {
    title: string;
    subtitle?: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  backgroundImage: string;
}

interface AboutHeroProps {
  scrollY: number;
  content: HeroContent;
}

export default function AboutHero({ scrollY, content }: AboutHeroProps) {
  const parallaxOffset = scrollY * 0.3;
  const {
    title,
    description,
    stats,
    affiliation,
    cta,
    backgroundImage
  } = content;

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent"></div>

      {/* 内容区域 */}
      <div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${-parallaxOffset}px)`
        }}
      >
        <div className="text-left max-w-3xl">

          {/* 主标题 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {title}
            <br />
          </h1>

          {/* 描述 */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* 数据统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((item, index) => (
              <div key={`${item.label}-${index}`} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-gray-300 text-sm">{item.label}</div>
              </div>
            ))}
          </div>

          {/* 企业归属信息 */}
          {affiliation && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12 border border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <i className="ri-building-2-line text-blue-400 text-2xl w-6 h-6 flex items-center justify-center"></i>
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">{affiliation.title}</div>
                  {affiliation.subtitle && (
                    <div className="text-blue-300 text-sm">{affiliation.subtitle}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
              {cta.primary}
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors whitespace-nowrap">
              {cta.secondary}
            </button>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
