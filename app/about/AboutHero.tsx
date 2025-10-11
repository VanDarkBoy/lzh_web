'use client';

interface AboutHeroProps {
  scrollY: number;
}

export default function AboutHero({ scrollY }: AboutHeroProps) {
  const parallaxOffset = scrollY * 0.3;

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20energy%20storage%20facility%20with%20professional%20corporate%20building%2C%20blue%20and%20green%20technology%20colors%2C%20clean%20industrial%20architecture%20with%20lithium%20battery%20systems%2C%20professional%20business%20photography%20style%20with%20corporate%20headquarters%20design&width=1920&height=1080&seq=about-hero-corporate&orientation=landscape')`,
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
            锂谷科技
            <br />
          </h1>

          {/* 描述 */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl">
            致力于动力系统及储能系统一站式解决方案的研发、制造和销售。
          </p>

          {/* 数据统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">12+</div>
              <div className="text-gray-300 text-sm">年行业经验</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">8万</div>
              <div className="text-gray-300 text-sm">平方工厂面积</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">6200万</div>
              <div className="text-gray-300 text-sm">注册实缴资本金</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10GWh+</div>
              <div className="text-gray-300 text-sm">年度交付量</div>
            </div>
          </div>

          {/* 企业归属信息 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12 border border-white/20">
            <div className="flex items-center justify-center space-x-4">
              <i className="ri-building-2-line text-blue-400 text-2xl w-6 h-6 flex items-center justify-center"></i>
              <div className="text-center">
                <div className="text-white font-semibold text-lg">隶属宗申动力</div>
                <div className="text-blue-300 text-sm">(001696.SZ)</div>
              </div>
            </div>
          </div>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
              了解更多
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors whitespace-nowrap">
              联系我们
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