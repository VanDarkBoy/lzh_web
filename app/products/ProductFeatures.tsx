'use client';

import {useInView} from 'react-intersection-observer';

interface ProductFeaturesProps {
    scrollY: number;
}

const features = [
    {
        id: 1,
        productCategoryId: 1,
        icon: "ri-stack-line",
        title: "模块化设计",
        description: "所有产品采用模块化设计，客户可以根据实际需求扩展系统容量，灵活配置，轻松升级。",
        dealBenefits: ["灵活扩容", "标准接口", "易于维护", "成本优化"]
    },
    {
        id: 2,
        productCategoryId: 1,
        icon: "ri-shield-check-line",
        title: "LiFePO₄ 安全性",
        description: "我们的系统采用 LiFePO₄ 电池，提供优异的安全性和长寿命，热稳定性极佳，多重保护机制。",
        dealBenefits: ["热稳定", "安全可靠", "长寿命", "环保材料"]
    },
    {
        id: 3,
        productCategoryId: 1,
        icon: "ri-shield-star-line",
        title: "IP65 环境适应性",
        description: "产品符合 IP65 防护等级，能够适应各种环境条件，确保在恶劣天气下依然稳定运行。",
        dealBenefits: ["防尘防水", "宽温范围", "户外适用", "稳定可靠"]
    },
    {
        id: 4,
        productCategoryId: 1,
        icon: "ri-brain-line",
        title: "智能控制系统",
        description: "集成智能控制技术，实时监控电池状态，智能优化充放电策略，确保系统最佳性能。",
        dealBenefits: ["实时监控", "智能优化", "预警保护", "远程管理"]
    }
];

const performanceData = [
    {
        id: 1,
        productCategoryId: 1,
        metric: "系统效率",
        metricValue: "95%+",
        description: "往返效率超过95%",
        icon: "ri-flashlight-line"
    },
    {
        id: 2,
        productCategoryId: 1,
        metric: "循环寿命",
        metricValue: "6000+",
        description: "循环充放电次数",
        icon: "ri-refresh-line"
    },
    {
        id: 3,
        productCategoryId: 1,
        metric: "使用寿命",
        metricValue: "15+年",
        description: "日历使用寿命",
        icon: "ri-time-line"
    },
    {
        id: 4,
        productCategoryId: 1,
        metric: "响应时间",
        metricValue: "<10ms",
        description: "系统响应速度",
        icon: "ri-speed-line"
    }
];

export default function ProductFeatures({scrollY}: ProductFeaturesProps) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section
            ref={ref}
            className="py-20 bg-gray-50"
            style={{
                transform: `translateY(${Math.max(0, (scrollY - 2400) * 0.02)}px)`
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                        产品功能<span className="text-blue-700">与优势</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        领先的储能技术与严格的质量标准相结合，为客户提供安全可靠、高效智能的能源解决方案
                    </p>
                </div>

                {/* 核心功能展示 */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-700 ${
                                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{transitionDelay: `${index * 200}ms`}}
                        >
                            <div
                                className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                <div className="flex items-start gap-6">
                                    <div
                                        className="w-16 h-16 bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-blue-700 text-2xl`}></i>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {feature.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            {feature.dealBenefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-blue-600"></i>
                                                    <span className="text-gray-700 text-sm">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 性能数据展示 */}
                <div className="bg-white p-8 lg:p-12 shadow-lg mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            核心性能指标
                        </h3>
                        <p className="text-gray-600 text-lg">
                            业界领先的技术参数，确保卓越的产品性能
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {performanceData.map((data, index) => (
                            <div
                                key={index}
                                className={`text-center p-6 bg-gray-50 hover:bg-blue-50 transition-all duration-500 ${
                                    inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                }`}
                                style={{transitionDelay: `${index * 150}ms`}}
                            >
                                <div
                                    className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                                    <i className={`${data.icon} w-8 h-8 flex items-center justify-center text-2xl`}></i>
                                </div>

                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {data.metricValue}
                                </div>

                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {data.metric}
                                </h4>

                                <p className="text-sm text-gray-600">
                                    {data.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 技术优势总结 */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 lg:p-12 shadow-2xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-6">
                            为什么选择 Lithium Valley 储能系统？
                        </h3>

                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <div className="text-4xl font-bold mb-2">12+</div>
                                <div className="text-blue-100">年行业经验</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">50+</div>
                                <div className="text-blue-100">国家和地区</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">100k+</div>
                                <div className="text-blue-100">用户信赖</div>
                            </div>
                        </div>

                        <p className="text-xl text-blue-100 leading-relaxed">
                            从家庭到企业，从固定到移动，我们提供全场景的储能解决方案。
                            <br/>
                            先进的LiFePO₄技术、严格的质量控制、完善的售后服务，
                            <br/>
                            让您的能源投资更安全、更可靠、更高效。
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
