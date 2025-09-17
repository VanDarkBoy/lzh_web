
'use client';

import { useInView } from 'react-intersection-observer';

interface ProductGridProps {
  scrollY: number;
  selectedCategory: string;
}

const allProducts = [
  {
    id: 1,
    title: "SolarMax Pro 400W Panel",
    description: "High-efficiency monocrystalline solar panel with 25-year warranty and superior low-light performance",
    category: "Solar",
    image: "https://readdy.ai/api/search-image?query=Professional%20high-efficiency%20solar%20panel%20with%20sleek%20black%20frame%2C%20monocrystalline%20solar%20cells%20with%20blue%20anti-reflective%20coating%2C%20modern%20solar%20panel%20product%20photography%20on%20clean%20white%20background%2C%20premium%20solar%20technology%20showcase&width=600&height=800&seq=solar-1&orientation=portrait",
    salesCount: 1250,
    isNew: false,
    isHotSelling: true,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 2,
    title: "EcoLED Smart Lighting Kit",
    description: "Complete smart LED lighting system with color changing, dimming, and voice control features",
    category: "Lighting",
    image: "https://readdy.ai/api/search-image?query=Smart%20LED%20lighting%20kit%20with%20modern%20light%20bulbs%20and%20smart%20hub%2C%20energy-efficient%20LED%20lights%20with%20color%20changing%20capability%2C%20professional%20lighting%20product%20photography%20on%20clean%20white%20background&width=600&height=800&seq=lighting-1&orientation=portrait",
    salesCount: 980,
    isNew: false,
    isHotSelling: true,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 3,
    title: "PowerBank Home 15kWh",
    description: "Compact residential energy storage system with smart home integration and backup power capabilities",
    category: "Battery",
    image: "https://readdy.ai/api/search-image?query=Sleek%20residential%20battery%20storage%20system%20with%20modern%20white%20design%2C%20digital%20display%20screen%2C%20compact%20home%20energy%20storage%20unit%2C%20professional%20product%20photography%20on%20clean%20background%2C%20contemporary%20energy%20storage%20technology&width=600&height=800&seq=battery-1&orientation=portrait",
    salesCount: 850,
    isNew: false,
    isHotSelling: true,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 4,
    title: "SmartGlass Triple Pane Window",
    description: "Energy-efficient triple-pane windows with smart tinting technology and superior insulation",
    category: "Windows",
    image: "https://readdy.ai/api/search-image?query=Modern%20triple-pane%20smart%20window%20with%20advanced%20glazing%20technology%2C%20energy-efficient%20window%20frame%2C%20professional%20window%20product%20photography%20showing%20clear%20glass%20and%20modern%20frame%20design%20on%20clean%20background&width=600&height=800&seq=window-1&orientation=portrait",
    salesCount: 620,
    isNew: false,
    isHotSelling: true,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 5,
    title: "EcoAir Smart HVAC System",
    description: "Energy-efficient heat pump system with AI-powered climate control and mobile app integration",
    category: "HVAC",
    image: "https://readdy.ai/api/search-image?query=Modern%20smart%20HVAC%20heat%20pump%20unit%20with%20sleek%20white%20exterior%20design%2C%20digital%20control%20panel%2C%20energy-efficient%20heating%20and%20cooling%20system%2C%20professional%20product%20photography%20showcasing%20advanced%20climate%20control%20technology&width=600&height=800&seq=hvac-1&orientation=portrait",
    salesCount: 450,
    isNew: false,
    isHotSelling: false,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 6,
    title: "ThermalGuard R-30 Insulation",
    description: "Eco-friendly spray foam insulation with superior thermal performance and moisture resistance",
    category: "Insulation",
    image: "https://readdy.ai/api/search-image?query=Professional%20spray%20foam%20insulation%20material%20in%20container%2C%20eco-friendly%20building%20insulation%20product%2C%20thermal%20insulation%20material%20with%20clean%20packaging%2C%20construction%20material%20product%20photography%20on%20white%20background&width=600&height=800&seq=insulation-1&orientation=portrait",
    salesCount: 380,
    isNew: false,
    isHotSelling: false,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 7,
    title: "SolarMax Commercial 500W",
    description: "Industrial-grade solar panel designed for commercial installations with maximum power output",
    category: "Solar",
    image: "https://readdy.ai/api/search-image?query=Large%20commercial%20solar%20panel%20with%20black%20aluminum%20frame%2C%20high-efficiency%20photovoltaic%20cells%2C%20industrial%20solar%20panel%20product%20photography%2C%20professional%20commercial%20renewable%20energy%20equipment%20on%20clean%20background&width=600&height=800&seq=solar-2&orientation=portrait",
    salesCount: 180,
    isNew: true,
    isHotSelling: false,
    inStock: true,
    dataProductShop: true
  },
  {
    id: 8,
    title: "PowerVault Business 50kWh",
    description: "Large-scale commercial energy storage solution for businesses and industrial applications",
    category: "Battery",
    image: "https://readdy.ai/api/search-image?query=Large%20commercial%20battery%20storage%20system%20with%20industrial%20design%2C%20business%20energy%20storage%20cabinet%20with%20multiple%20battery%20modules%2C%20professional%20commercial%20energy%20storage%20equipment%20photography&width=600&height=800&seq=battery-2&orientation=portrait",
    salesCount: 95,
    isNew: true,
    isHotSelling: false,
    inStock: true,
    dataProductShop: true
  }
];

export default function ProductGrid({ scrollY, selectedCategory }: ProductGridProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  // 按销量排序（从高到低）
  const sortedProducts = filteredProducts.sort((a, b) => b.salesCount - a.salesCount);

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Premium sustainable building products sorted by popularity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group transition-all duration-1000 ${
                inView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-product-shop={product.dataProductShop}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col relative">
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  {product.isNew && (
                    <span className="bg-emerald-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isHotSelling && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                      HOT
                    </span>
                  )}
                </div>
                
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap cursor-pointer text-sm">
                      <i className="ri-shopping-cart-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
                      Add to Cart
                    </button>
                    <button className="bg-gray-100 text-gray-700 p-3 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                      <i className="ri-heart-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <i className="ri-shopping-bag-line text-4xl sm:text-6xl text-gray-300 mb-4 sm:mb-6 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto"></i>
            <h3 className="text-xl sm:text-2xl font-light text-gray-500 mb-3 sm:mb-4">No products found</h3>
            <p className="text-sm sm:text-base text-gray-400">Try selecting a different category to see more products.</p>
          </div>
        )}
      </div>
    </section>
  );
}
