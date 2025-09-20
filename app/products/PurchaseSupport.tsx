
'use client';

import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Link from 'next/link';

interface PurchaseSupportProps {
  scrollY: number;
}

const purchaseChannels = [
  {
    title: "在线咨询提交询盘",
    description: "提交产品询盘获取详细方案",
    icon: "ri-customer-service-line",
    action: "提交询盘",
    features: ["在线客服", "技术咨询", "方案定制", "实时报价"]
  },
  {
    title: "成为经销商",
    description: "加入我们的经销商网络，共享市场机遇",
    icon: "ri-group-line",
    action: "申请成为经销商",
    features: ["区域代理", "销售支持", "培训服务", "市场推广"]
  },
  {
    title: "项目合作",
    description: "大型项目直接合作，提供端到端解决方案",
    icon: "ri-building-line",
    action: "项目咨询",
    features: ["项目定制", "工程服务", "技术支持", "长期合作"]
  }
];

const supportServices = [
  {
    title: "24小时在线客服",
    description: "全天候在线客服支持，快速响应客户需求",
    icon: "ri-service-line",
    availability: "7×24小时"
  },
  {
    title: "技术支持热线",
    description: "专业技术团队提供安装、调试和维护指导",
    icon: "ri-phone-line",
    availability: "工作日 9:00-18:00"
  },
  {
    title: "远程诊断服务",
    description: "通过智能监控系统提供远程故障诊断",
    icon: "ri-computer-line",
    availability: "实时监控"
  },
  {
    title: "现场服务支持",
    description: "必要时派遣工程师提供现场技术服务",
    icon: "ri-tools-line",
    availability: "预约服务"
  }
];

const faqData = [
  {
    question: "如何选择合适的储能系统容量？",
    answer: "容量选择需要考虑用电负荷、使用时长、预算等因素。我们的技术团队会根据您的具体需求提供专业的系统设计建议。"
  },
  {
    question: "产品质保期是多长？",
    answer: "我们的储能系统提供10年产品质保，电池核心组件质保期可达15年，让您的投资更有保障。"
  },
  {
    question: "系统安装需要多长时间？",
    answer: "根据系统规模不同，家用系统通常1-2天完成安装，商用系统3-7天，我们的模块化设计大大缩短了安装时间。"
  },
  {
    question: "是否支持系统扩容？",
    answer: "是的，我们的模块化设计支持后期扩容，您可以根据需求增长逐步扩展系统容量。"
  }
];

export default function PurchaseSupport({ scrollY }: PurchaseSupportProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [activeTab, setActiveTab] = useState('purchase');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section 
      ref={ref}
      className="py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 3200) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            购买渠道<span className="text-blue-700">与支持</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            多渠道购买选择，全方位技术支持，让您的储能之旅更加轻松便捷
          </p>
        </div>

        {/* 标签切换 */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('purchase')}
              className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                activeTab === 'purchase'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              售前咨询
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                activeTab === 'support'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              技术支持
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              常见问题
            </button>
          </div>
        </div>

        {/* 售前咨询 */}
        {activeTab === 'purchase' && (
          <div className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {purchaseChannels.map((channel, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mb-6">
                    <i className={`${channel.icon} w-8 h-8 flex items-center justify-center text-blue-700 text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {channel.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {channel.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {channel.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-blue-600"></i>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/get-started">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                      {channel.action}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 技术支持 */}
        {activeTab === 'support' && (
          <div className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {supportServices.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-500 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${service.icon} w-6 h-6 flex items-center justify-center text-blue-700 text-xl`}></i>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {service.title}
                        </h3>
                        <span className="text-sm text-blue-600 font-medium">
                          {service.availability}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 联系方式 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 lg:p-12 text-center shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">联系我们获取支持</h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <i className="ri-phone-line w-8 h-8 flex items-center justify-center text-3xl mb-2 mx-auto"></i>
                  <div className="font-semibold mb-1">客服热线</div>
                  <div className="text-blue-100">400-888-8888</div>
                </div>
                <div>
                  <i className="ri-mail-line w-8 h-8 flex items-center justify-center text-3xl mb-2 mx-auto"></i>
                  <div className="font-semibold mb-1">技术邮箱</div>
                  <div className="text-blue-100">support@lithiumvalley.com</div>
                </div>
                <div>
                  <i className="ri-wechat-line w-8 h-8 flex items-center justify-center text-3xl mb-2 mx-auto"></i>
                  <div className="font-semibold mb-1">微信客服</div>
                  <div className="text-blue-100">LithiumValley2024</div>
                </div>
              </div>
              
              <Link href="/get-started">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer rounded-full">
                  立即获取技术支持
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* 常见问题 */}
        {activeTab === 'faq' && (
          <div className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <i className={`ri-arrow-down-s-line w-5 h-5 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
                        expandedFaq === index ? 'transform rotate-180' : ''
                      }`}></i>
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">
                  没有找到您需要的答案？我们的技术团队随时为您解答
                </p>
                <Link href="/get-started">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                    联系技术专家
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
