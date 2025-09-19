
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProjectsSectionProps {
  scrollY: number;
}

const products = [
  {
    id: 1,
    title: "PowerMax Commercial ESS",
    description: "High-capacity energy storage system for commercial applications with 500kWh-2MWh configurations",
    image: "https://readdy.ai/api/search-image?query=Large%20commercial%20energy%20storage%20system%20with%20industrial%20battery%20containers%2C%20modern%20clean%20facility%20with%20blue%20and%20white%20energy%20storage%20units%2C%20professional%20product%20photography%20showcasing%20large-scale%20battery%20storage%20technology%2C%20industrial%20warehouse%20setting%20with%20organized%20battery%20modules&width=600&height=800&seq=product-1&orientation=portrait",
    stats: "Up to 2MWh Capacity",
    dataProductShop: true
  },
  {
    id: 2,
    title: "EcoGrid Residential Battery",
    description: "Compact home energy storage solution with smart home integration and backup power capabilities",
    image: "https://readdy.ai/api/search-image?query=Sleek%20residential%20energy%20storage%20battery%20system%20mounted%20on%20modern%20home%20wall%2C%20clean%20white%20and%20blue%20home%20battery%20unit%20with%20digital%20display%2C%20professional%20product%20photography%20showing%20compact%20residential%20energy%20storage%20solution%20in%20contemporary%20home%20setting&width=600&height=800&seq=product-2&orientation=portrait",
    stats: "10-20kWh Options",
    dataProductShop: true
  },
  {
    id: 3,
    title: "IndustrialPro Mega Storage",
    description: "Utility-scale energy storage for industrial facilities and grid stabilization applications",
    image: "https://readdy.ai/api/search-image?query=Massive%20industrial%20energy%20storage%20facility%20with%20rows%20of%20large%20battery%20containers%2C%20utility-scale%20energy%20storage%20installation%20with%20professional%20industrial%20design%2C%20clean%20modern%20industrial%20setting%20with%20large-scale%20battery%20systems%2C%20professional%20infrastructure%20photography&width=600&height=800&seq=product-3&orientation=portrait",
    stats: "10MWh+ Scalable",
    dataProductShop: true
  }
];

export default function ProjectsSection({ scrollY }: { scrollY: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
            Our Energy
            <br />
            <span className="text-blue-700">Storage Products</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Comprehensive energy storage solutions designed for every application - from residential homes to large-scale industrial facilities
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
          >
            View All Products
            <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product-detail?id=${product.id}`}
              className={`group transition-all duration-1000 ${
                inView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              data-product-shop={product.dataProductShop}
            >
              <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full">
                      {product.stats}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap text-sm text-center">
                    Learn More
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
