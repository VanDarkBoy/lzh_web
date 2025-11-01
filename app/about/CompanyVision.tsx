
'use client';

export default function CompanyVision() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              愿景与使命
            </h2>

            <div className="space-y-8">
              {/* 愿景 */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-eye-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">愿景</h3>
                    <p className="text-gray-600 leading-relaxed">
                      致力于成为客户信任的能源系统集成商<br />
                      全球化的新能源生活方式赋能者，为人类的可持续发展作出贡献
                    </p>
                  </div>
                </div>
              </div>

              {/* 使命 */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-target-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">使命</h3>
                    <p className="text-gray-600 leading-relaxed">
                      为世界绿色能源贡献锂谷智慧
                    </p>
                  </div>
                </div>
              </div>

              {/* 价值观 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-heart-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">价值观</h3>
                    <div className="text-gray-600 leading-relaxed">
                      大胆想，立刻做，做难的事必有所得
                    </div>
                  </div>
                </div>
              </div>

              {/* 客户方针 */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">客户方针</h3>
                    <p className="text-gray-600 leading-relaxed">
                      客户至上、质量为本、开拓创新、助力双碳
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧图片 */}
          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=Modern%20energy%20storage%20technology%20vision%20with%20green%20sustainable%20future%2C%20professional%20corporate%20photography%20showing%20renewable%20energy%20systems%2C%20clean%20technology%20with%20solar%20panels%20and%20battery%20storage%2C%20blue%20and%20green%20environmental%20colors&width=600&height=700&seq=vision-mission&orientation=portrait"
              alt="愿景与使命"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}