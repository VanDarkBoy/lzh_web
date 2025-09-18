'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProductDetailProps {
  productId: string;
}

type SpecificationKey =
  | 'capacity'
  | 'voltage'
  | 'current'
  | 'cycles'
  | 'efficiency'
  | 'warranty'
  | 'operating'
  | 'protection';

interface ProductDetailData {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  dealGallery: string[];
  dealFeatures: string[];
  dealApplications: string[];
  [key in SpecificationKey]: string;
}

type ProductDetailApiPayload = Omit<ProductDetailData, SpecificationKey | 'dealGallery' | 'dealFeatures' | 'dealApplications'> &
  Partial<Record<SpecificationKey, string>> & {
    dealGallery?: string[];
    dealFeatures?: string[];
    dealApplications?: string[];
    specifications?: Partial<Record<SpecificationKey, string>>;
  };

const specificationKeys: SpecificationKey[] = [
  'capacity',
  'voltage',
  'current',
  'cycles',
  'efficiency',
  'warranty',
  'operating',
  'protection',
];

const specificationLabels: Record<SpecificationKey, string> = {
  capacity: 'Capacity',
  voltage: 'Voltage',
  current: 'Current',
  cycles: 'Cycles',
  efficiency: 'Efficiency',
  warranty: 'Warranty',
  operating: 'Operating',
  protection: 'Protection',
};

const normalizeProductData = (data: ProductDetailApiPayload): ProductDetailData => {
  const { specifications, ...rest } = data;

  const ensureValue = (key: SpecificationKey) => data[key] ?? specifications?.[key] ?? '';

  return {
    ...rest,
    dealGallery: data.dealGallery ?? [],
    dealFeatures: data.dealFeatures ?? [],
    dealApplications: data.dealApplications ?? [],
    capacity: ensureValue('capacity'),
    voltage: ensureValue('voltage'),
    current: ensureValue('current'),
    cycles: ensureValue('cycles'),
    efficiency: ensureValue('efficiency'),
    warranty: ensureValue('warranty'),
    operating: ensureValue('operating'),
    protection: ensureValue('protection'),
  } as ProductDetailData;
};

const isProductDetailApiPayload = (value: unknown): value is ProductDetailApiPayload => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.category === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.fullDescription === 'string' &&
    typeof obj.image === 'string'
  );
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [specsRef, specsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/getProductDetail/${productId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('获取产品详情失败');
        }

        const rawData: unknown = await response.json();

        let parsedProduct: ProductDetailData | null = null;

        if (isProductDetailApiPayload(rawData)) {
          parsedProduct = normalizeProductData(rawData);
        } else if (rawData && typeof rawData === 'object') {
          const record = rawData as Record<string, unknown>;
          const candidate = record[productId];

          if (isProductDetailApiPayload(candidate)) {
            parsedProduct = normalizeProductData(candidate);
          }
        }

        if (!parsedProduct) {
          setProduct(null);
          setError('未找到对应的产品信息');
        } else {
          setProduct(parsedProduct);
          setError(null);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error('Error fetching product detail:', err);
        setError('加载产品详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        正在加载产品详情...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">产品详情加载失败</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const specificationEntries = specificationKeys
    .map((key) => ({
      key,
      label: specificationLabels[key],
      value: product[key],
    }))
    .filter((entry) => Boolean(entry.value));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <i className="ri-arrow-right-s-line"></i>
                <Link href="/#products" className="hover:text-blue-600">Products</Link>
                <i className="ri-arrow-right-s-line"></i>
                <span className="text-gray-900">{product.title}</span>
              </nav>

              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {product.title}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-phone-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
                  Contact Sales
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-download-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
                  Download Specs
                </button>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl" data-product-shop>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover object-top hover:scale-105 transition-transform duration-700"
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
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {specificationEntries.length > 0 && (
        <section ref={specsRef} className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Detailed technical specifications and performance parameters
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specificationEntries.map(({ key, label, value }, index) => (
                <div
                  key={key}
                  className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-1000 ${
                    specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{label}</h3>
                    <p className="text-blue-600 font-bold text-xl">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features & Applications */}
      <section ref={featuresRef} className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Key Features
              </h3>
              <div className="space-y-4">
                {product.dealFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <i className="ri-check-line text-blue-600 text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Applications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.dealApplications.map((application, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-building-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
                      </div>
                      <span className="text-gray-800 font-medium">{application}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact our experts to discuss your energy storage needs and get a custom quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-phone-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
              Call Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-mail-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
