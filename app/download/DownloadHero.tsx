
'use client';

interface DownloadHeroProps {
  scrollY: number;
}

export default function DownloadHero({ scrollY }: DownloadHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-green-50" 
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20technical%20documentation%20center%20with%20organized%20files%20and%20digital%20documents%2C%20clean%20modern%20office%20environment%20with%20technical%20manuals%20and%20specifications%20displayed%20on%20screens%2C%20high-tech%20documentation%20library%20with%20organized%20storage%20systems&width=1920&height=1080&seq=download-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${scrollY * 0.5}px)`
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/60 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            下载中心
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            获取产品技术文档、规格说明书、安装指南等专业资料
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              <span>产品规格书</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
              <span>安装手册</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
              <span>技术参数</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
              <span>认证证书</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
