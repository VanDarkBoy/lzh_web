'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Header from '../components/Header';

interface ProductDetailData {
  id: bigint;
  name: string;
  category: bigint;
  categoryName: string;
  description: string;
  fullDescription: string;
  image: string;
  dealGallery: string[];

  // -------
  capacity: string;
  voltage: string;
  current: string;
  cycles: string;
  efficiency: string;
  warranty: string;
  operating: string;
  protection: string;

  // -------
  dealFeatures: string[];
  dealApplications: string[];
}

interface PageContent {
  invalidProductId: string;
  productDetailRequestError: string;
  productNotFoundMessage: string;
  loadFailedMessage: string;
  loadingLabel: string;
  detailFailedTitle: string;
  goHomeLabel: string;
  productNotFoundTitle: string;
  contactSalesLabel: string;
  downloadSpecsLabel: string;
  technicalSpecificationsTitle: string;
  technicalSpecificationsDescription: string;
  keySpecificationsTitle: string;
  keyFeaturesTitle: string;
  applicationsTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  scheduleConsultationLabel: string;
  downloadFullManualLabel: string;
  whyChooseUsTitle: string;
  trustedByDescription: string;
  endToEndSolutions: string;
  monitoringSupport: string;
  provenTrackRecord: string;
  scalableSystems: string;

  capacity: string;
  voltage: string;
  current: string;
  cycles: string;
  efficiency: string;
  warranty: string;
  operating: string;
  protection: string;
}

const defaultPageContent: PageContent = {
  invalidProductId: '未提供有效的产品ID',
  productDetailRequestError: '获取产品详情失败',
  productNotFoundMessage: '未找到对应的产品信息',
  loadFailedMessage: '加载产品详情失败，请稍后重试',
  loadingLabel: '正在加载产品详情...',
  detailFailedTitle: '产品详情加载失败',
  goHomeLabel: '回到主页',
  productNotFoundTitle: '未找到产品',
  contactSalesLabel: '联系销售',
  downloadSpecsLabel: '下载规格',
  technicalSpecificationsTitle: '技术规格',
  technicalSpecificationsDescription: '详细的技术规格和性能参数',
  keySpecificationsTitle: '关键规格',
  keyFeaturesTitle: '关键功能',
  applicationsTitle: '应用方案',
  ctaTitle: '准备部署世界一流的储能解决方案了吗？',
  ctaDescription: '我们的专家将帮助您设计和实施从咨询到部署的完美系统。',
  scheduleConsultationLabel: '安排咨询',
  downloadFullManualLabel: '下载完整的手册',
  whyChooseUsTitle: '为什么选择我们？',
  trustedByDescription: '受到全球行业领导者的信任',
  endToEndSolutions: '端到端储能解决方案',
  monitoringSupport: '全天候监控和支持服务',
  provenTrackRecord: '跨行业良好的业绩记录',
  scalableSystems: '根据您的需求量身定制的可扩展系统',

  capacity: '容量',
  voltage: '电压',
  current: '电流',
  cycles: '循环次数',
  efficiency: '电耗',
  warranty: '质保',
  operating: '环境温度',
  protection: '防水级别',

};

type ErrorMessageKey = 'invalidProductId' | 'productNotFoundMessage' | 'loadFailedMessage';

const sanitizeProductId = (value: string | null | undefined): string => {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  return trimmed;
};

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const productId = useMemo(() => {
    const queryId = sanitizeProductId(searchParams?.get('id'));

    if (queryId) {
      return queryId;
    }

    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);

      for (let index = segments.length - 1; index >= 0; index -= 1) {
        const segment = sanitizeProductId(segments[index]);

        if (segment && segment !== 'product-detail') {
          return segment;
        }
      }
    }

    return '';
  }, [pathname, searchParams]);

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [specsRef, specsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState<ErrorMessageKey | null>(null);
  const [pageContent, setPageContent] = useState<PageContent>(defaultPageContent);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCopy = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/ProductDetail`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product detail copy');
        }

        const rawCopy: unknown = await response.json();

        if (rawCopy && typeof rawCopy === 'object') {
          const nextCopy: PageContent = { ...defaultPageContent };
          const copyRecord = rawCopy as Record<string, unknown>;

          (Object.keys(defaultPageContent) as Array<keyof PageContent>).forEach((key) => {
            const value = copyRecord[key];

            if (typeof value === 'string' && value.trim().length > 0) {
              nextCopy[key] = value;
            }
          });

          setPageContent(nextCopy);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error('Error fetching product detail copy:', err);
      }
    };

    fetchCopy();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (!productId) {
      setProduct(null);
      setErrorKey('invalidProductId');
      setLoading(false);
      return () => controller.abort();
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/getProductDetail/${productId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(pageContent.productDetailRequestError);
        }

        const rawData: unknown = await response.json();

        let parsedProduct: ProductDetailData | null = null;

        if (rawData && typeof rawData === 'object') {
          if ('id' in rawData) {
            parsedProduct = rawData as ProductDetailData;
          } else {
            const record = rawData as Record<string, ProductDetailData>;
            parsedProduct = record[productId] ?? null;
          }
        }

        if (!parsedProduct) {
          setProduct(null);
          setErrorKey('productNotFoundMessage');
        } else {
          setProduct(parsedProduct);
          setErrorKey(null);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error('Error fetching product detail:', err);
        setErrorKey('loadFailedMessage');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [pageContent.productDetailRequestError, productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 pt-20 sm:pt-24 flex items-center justify-center text-gray-500">
          {pageContent.loadingLabel}
        </main>
      </div>
    );
  }

  if (errorKey) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 pt-20 sm:pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.detailFailedTitle}</h1>
            <p className="text-gray-600 mb-6">{pageContent[errorKey]}</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              {pageContent.goHomeLabel}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 pt-20 sm:pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageContent.productNotFoundTitle}</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              {pageContent.goHomeLabel}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pt-20 sm:pt-24">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.categoryName}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {product.name}
                </h1>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {product.fullDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-phone-line mr-2 w-4 h-4 items-center justify-center inline-flex"></i>
                    {pageContent.contactSalesLabel}
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-download-line mr-2 w-4 h-4 items-center justify-center inline-flex"></i>
                    {pageContent.downloadSpecsLabel}
                  </button>
                </div>
              </div>

              <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl" data-product-shop>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-h-96 object-contain hover:scale-105 transition-transform duration-700 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.dealGallery.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl shadow-lg group">
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section ref={specsRef} className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 transition-all duration-1000 ${specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {pageContent.technicalSpecificationsTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {pageContent.technicalSpecificationsDescription}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{pageContent.keySpecificationsTitle}</h3>
                <dl className="space-y-4">
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.capacity}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.capacity}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.voltage}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.voltage}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.current}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.current}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.cycles}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.cycles}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.efficiency}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.efficiency}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.warranty}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.warranty}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.operating}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.operating}
                    </dd>
                  </div>
                  <div  className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-1/3">
                      {pageContent.protection}
                    </dt>
                    <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:w-2/3">
                      {product.protection}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">{pageContent.keyFeaturesTitle}</h3>
                  <ul className="space-y-4">
                    {product.dealFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold mr-4">
                          {index + 1}
                        </span>
                        <span className="text-base text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">{pageContent.applicationsTitle}</h3>
                  <ul className="space-y-3">
                    {product.dealApplications.map((application, index) => (
                      <li key={index} className="flex items-start text-base text-gray-700">
                        <i className="ri-checkbox-circle-line text-blue-600 mr-3 mt-1"></i>
                        <span>{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={featuresRef} className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-2xl text-white transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-3">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    {pageContent.ctaTitle}
                  </h2>
                  <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                    {pageContent.ctaDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer">
                      {pageContent.scheduleConsultationLabel}
                    </button>
                    <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
                      {pageContent.downloadFullManualLabel}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <i className="ri-flashlight-line text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{pageContent.whyChooseUsTitle}</h3>
                        <p className="text-blue-100 text-sm">{pageContent.trustedByDescription}</p>
                      </div>
                    </div>

                    <ul className="space-y-4 text-blue-50 text-sm">
                      <li className="flex items-center gap-3">
                        <i className="ri-checkbox-circle-line text-xl"></i>
                        <span>{pageContent.endToEndSolutions}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <i className="ri-checkbox-circle-line text-xl"></i>
                        <span>{pageContent.monitoringSupport}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <i className="ri-checkbox-circle-line text-xl"></i>
                        <span>{pageContent.provenTrackRecord}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <i className="ri-checkbox-circle-line text-xl"></i>
                        <span>{pageContent.scalableSystems}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
