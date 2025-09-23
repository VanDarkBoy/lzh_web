'use client';

import {useEffect, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import type {Category, PerformanceMetric, ProductFeatureItem} from './types';

interface ProductFeaturesProps {
    scrollY: number;
    selectedCategory: Category | null;
}

export default function ProductFeatures({scrollY, selectedCategory}: ProductFeaturesProps) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const [features, setFeatures] = useState<ProductFeatureItem[]>([]);
    const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        if (!selectedCategory) {
            setFeatures([]);
            setPerformanceData([]);
            setError(null);
            setLoading(false);
            return () => controller.abort();
        }

        if (!process.env.NEXT_PUBLIC_API_BASE) {
            setFeatures([]);
            setPerformanceData([]);
            setError('未配置产品功能接口地址');
            setLoading(false);
            return () => controller.abort();
        }

        const fetchFeatureData = async () => {
            try {
                setLoading(true);

                const categoryIdParam = encodeURIComponent(String(selectedCategory.id));
                const [featuresResponse, performanceResponse] = await Promise.all([
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE}/api/getProductFeatures?productCategoryId=${categoryIdParam}`,
                        {signal: controller.signal}
                    ),
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE}/api/getPerformanceMetrics?productCategoryId=${categoryIdParam}`,
                        {signal: controller.signal}
                    ),
                ]);

                if (!featuresResponse.ok) {
                    throw new Error('获取产品功能失败');
                }

                if (!performanceResponse.ok) {
                    throw new Error('获取性能指标失败');
                }

                const rawFeatures: unknown = await featuresResponse.json();
                const rawPerformance: unknown = await performanceResponse.json();

                const normalizedFeatures = Array.isArray(rawFeatures)
                    ? (rawFeatures as ProductFeatureItem[])
                    : Object.values((rawFeatures ?? {}) as Record<string, ProductFeatureItem>);
                const normalizedPerformance = Array.isArray(rawPerformance)
                    ? (rawPerformance as PerformanceMetric[])
                    : Object.values((rawPerformance ?? {}) as Record<string, PerformanceMetric>);

                const categoryId = String(selectedCategory.id);

                setFeatures(
                    normalizedFeatures.filter(
                        (item) => String(item.productCategoryId) === categoryId
                    )
                );
                setPerformanceData(
                    normalizedPerformance.filter(
                        (item) => String(item.productCategoryId) === categoryId
                    )
                );
                setError(null);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }

                console.error('Error fetching product feature data:', err);
                setFeatures([]);
                setPerformanceData([]);
                setError('加载产品功能数据失败，请稍后重试');
            } finally {
                setLoading(false);
            }
        };

        fetchFeatureData();

        return () => controller.abort();
    }, [selectedCategory]);

    const hasCategory = Boolean(selectedCategory);

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

                {error && (
                    <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 text-center">
                        {error}
                    </div>
                )}

                {!error && !loading && !hasCategory && (
                    <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-600 text-center">
                        请选择一个产品分类以查看对应的功能与性能数据。
                    </div>
                )}

                {/* 核心功能展示 */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {loading ? (
                        <div className="md:col-span-2 flex min-h-[160px] items-center justify-center text-gray-500">
                            正在加载产品功能...
                        </div>
                    ) : error ? (
                        <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
                            {error}
                        </div>
                    ) : !hasCategory ? (
                        <div className="md:col-span-2 flex min-h-[160px] items-center justify-center text-gray-500">
                            请选择产品分类以查看功能数据。
                        </div>
                    ) : features.length > 0 ? (
                        features.map((feature, index) => (
                            <div
                                key={feature.id ?? index}
                                className={`transition-all duration-700 ${
                                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                                style={{transitionDelay: `${index * 200}ms`}}
                            >
                                <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-blue-100 flex items-center justify-center flex-shrink-0">
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
                        ))
                    ) : (
                        <div className="md:col-span-2 flex min-h-[160px] items-center justify-center text-gray-500">
                            暂无该分类的产品功能数据。
                        </div>
                    )}
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
                        {loading ? (
                            <div className="md:col-span-2 lg:col-span-4 flex min-h-[140px] items-center justify-center text-gray-500">
                                正在加载性能指标...
                            </div>
                        ) : error ? (
                            <div className="md:col-span-2 lg:col-span-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
                                {error}
                            </div>
                        ) : !hasCategory ? (
                            <div className="md:col-span-2 lg:col-span-4 flex min-h-[140px] items-center justify-center text-gray-500">
                                请选择产品分类以查看性能指标。
                            </div>
                        ) : performanceData.length > 0 ? (
                            performanceData.map((data, index) => (
                                <div
                                    key={data.id ?? index}
                                    className={`text-center p-6 bg-gray-50 hover:bg-blue-50 transition-all duration-500 ${
                                        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                    }`}
                                    style={{transitionDelay: `${index * 150}ms`}}
                                >
                                    <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
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
                            ))
                        ) : (
                            <div className="md:col-span-2 lg:col-span-4 flex min-h-[140px] items-center justify-center text-gray-500">
                                暂无该分类的性能指标数据。
                            </div>
                        )}
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
