'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProductDetailProps {
  productId: string;
}

const productData = {
  '1': {
    id: 1,
    title: "PowerMax Commercial ESS",
    category: "Commercial Energy Storage",
    description: "High-capacity energy storage system for commercial applications with 500kWh-2MWh configurations",
    fullDescription: "The PowerMax Commercial ESS represents the pinnacle of commercial energy storage technology. Designed for businesses, industrial facilities, and utility-scale applications, this system delivers unmatched reliability and performance. With modular scalability from 500kWh to 2MWh, it adapts to your growing energy needs while providing exceptional return on investment.",
    image: "https://readdy.ai/api/search-image?query=Large%20commercial%20energy%20storage%20system%20with%20industrial%20battery%20containers%2C%20modern%20clean%20facility%20with%20blue%20and%20white%20energy%20storage%20units%2C%20professional%20product%20photography%20showcasing%20large-scale%20battery%20storage%20technology%2C%20industrial%20warehouse%20setting%20with%20organized%20battery%20modules&width=800&height=600&seq=product-detail-1&orientation=landscape",
    gallery: [
      "https://readdy.ai/api/search-image?query=Commercial%20energy%20storage%20system%20installation%20in%20modern%20industrial%20facility%2C%20professional%20technicians%20working%20on%20large%20battery%20modules%2C%20clean%20industrial%20environment%20with%20safety%20equipment%20and%20monitoring%20systems&width=600&height=400&seq=gallery-1-1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Energy%20storage%20system%20control%20panel%20with%20digital%20displays%20showing%20performance%20metrics%2C%20professional%20monitoring%20interface%20with%20real-time%20data%20visualization%2C%20industrial%20control%20room%20setting&width=600&height=400&seq=gallery-1-2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Large-scale%20battery%20modules%20arranged%20in%20clean%20industrial%20facility%2C%20organized%20rows%20of%20energy%20storage%20units%20with%20safety%20systems%2C%20professional%20industrial%20photography&width=600&height=400&seq=gallery-1-3&orientation=landscape"
    ],
    specifications: {
      capacity: "500kWh - 2MWh",
      voltage: "400V DC / 480V AC",
      current: "1250A - 5000A",
      cycles: "6000+ cycles @ 80% DOD",
      efficiency: "95%+ round-trip efficiency",
      warranty: "15 years",
      operating: "-20°C to +50°C",
      protection: "IP54 rated enclosure"
    },
    features: [
      "Modular and scalable design",
      "Advanced battery management system",
      "Remote monitoring and control",
      "Grid-tie and islanding capabilities",
      "Safety systems and fire suppression",
      "Professional installation support"
    ],
    applications: [
      "Commercial buildings",
      "Industrial facilities",
      "Data centers",
      "Manufacturing plants",
      "Distribution centers",
      "Utility substations"
    ]
  },
  '2': {
    id: 2,
    title: "EcoGrid Residential Battery",
    category: "Residential Energy Storage",
    description: "Compact home energy storage solution with smart home integration and backup power capabilities",
    fullDescription: "The EcoGrid Residential Battery transforms your home into an energy-independent powerhouse. This sleek, wall-mounted system seamlessly integrates with your existing solar installation or operates as a standalone backup power solution. With intelligent energy management and mobile app control, you'll optimize your energy usage while ensuring your family never loses power.",
    image: "https://readdy.ai/api/search-image?query=Sleek%20residential%20energy%20storage%20battery%20system%20mounted%20on%20modern%20home%20wall%2C%20clean%20white%20and%20blue%20home%20battery%20unit%20with%20digital%20display%2C%20professional%20product%20photography%20showing%20compact%20residential%20energy%20storage%20solution%20in%20contemporary%20home%20setting&width=800&height=600&seq=product-detail-2&orientation=landscape",
    gallery: [
      "https://readdy.ai/api/search-image?query=Home%20energy%20storage%20system%20installation%20in%20modern%20garage%2C%20professional%20installation%20with%20clean%20wiring%20and%20safety%20equipment%2C%20residential%20setting%20with%20organized%20setup&width=600&height=400&seq=gallery-2-1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Mobile%20app%20interface%20for%20home%20energy%20storage%20control%2C%20smartphone%20showing%20energy%20management%20dashboard%2C%20real-time%20monitoring%20and%20control%20features&width=600&height=400&seq=gallery-2-2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Residential%20solar%20panels%20connected%20to%20home%20battery%20storage%20system%2C%20integrated%20renewable%20energy%20solution%20on%20modern%20house%20roof&width=600&height=400&seq=gallery-2-3&orientation=landscape"
    ],
    specifications: {
      capacity: "10kWh - 20kWh",
      voltage: "48V DC / 240V AC",
      current: "200A - 400A",
      cycles: "8000+ cycles @ 90% DOD",
      efficiency: "96%+ round-trip efficiency",
      warranty: "12 years",
      operating: "0°C to +40°C",
      protection: "IP65 rated for outdoor use"
    },
    features: [
      "Compact wall-mounted design",
      "Smart home integration",
      "Mobile app control",
      "Silent operation",
      "Automatic backup switching",
      "Solar panel compatibility"
    ],
    applications: [
      "Single-family homes",
      "Townhouses",
      "Small apartments",
      "Off-grid cabins",
      "RV and marine applications",
      "Emergency backup power"
    ]
  },
  '3': {
    id: 3,
    title: "IndustrialPro Mega Storage",
    category: "Industrial Energy Storage",
    description: "Utility-scale energy storage for industrial facilities and grid stabilization applications",
    fullDescription: "The IndustrialPro Mega Storage system sets the standard for utility-scale energy storage. Engineered for the most demanding industrial applications, this system provides massive capacity from 10MWh to 100MWh with unparalleled reliability. Perfect for grid stabilization, peak shaving, and renewable energy integration at the largest scale.",
    image: "https://readdy.ai/api/search-image?query=Massive%20industrial%20energy%20storage%20facility%20with%20rows%20of%20large%20battery%20containers%2C%20utility-scale%20energy%20storage%20installation%20with%20professional%20industrial%20design%2C%20clean%20modern%20industrial%20setting%20with%20large-scale%20battery%20systems%2C%20professional%20infrastructure%20photography&width=800&height=600&seq=product-detail-3&orientation=landscape",
    gallery: [
      "https://readdy.ai/api/search-image?query=Utility-scale%20energy%20storage%20construction%20site%20with%20massive%20battery%20containers%20being%20installed%2C%20industrial%20cranes%20and%20professional%20installation%20crew%2C%20large-scale%20infrastructure%20project&width=600&height=400&seq=gallery-3-1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Industrial%20control%20center%20for%20mega-scale%20energy%20storage%20facility%2C%20multiple%20screens%20showing%20grid%20monitoring%20data%2C%20professional%20operators%20managing%20utility-scale%20systems&width=600&height=400&seq=gallery-3-2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Aerial%20view%20of%20massive%20energy%20storage%20facility%20connected%20to%20electrical%20grid%2C%20utility-scale%20installation%20with%20transmission%20lines%20and%20industrial%20infrastructure&width=600&height=400&seq=gallery-3-3&orientation=landscape"
    ],
    specifications: {
      capacity: "10MWh - 100MWh",
      voltage: "1000V DC / 35kV AC",
      current: "10,000A - 100,000A",
      cycles: "5000+ cycles @ 85% DOD",
      efficiency: "94%+ round-trip efficiency",
      warranty: "20 years",
      operating: "-30°C to +60°C",
      protection: "IP55 rated containers"
    },
    features: [
      "Utility-scale capacity",
      "Grid synchronization",
      "Advanced control systems",
      "24/7 monitoring center",
      "Redundant safety systems",
      "Transformer integration"
    ],
    applications: [
      "Utility companies",
      "Power generation facilities",
      "Industrial complexes",
      "Mining operations",
      "Grid stabilization",
      "Renewable energy farms"
    ]
  }
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [specsRef, specsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const product = productData[productId as keyof typeof productData];

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
            {product.gallery.map((image, index) => (
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

      {/* Specifications */}
      <section ref={specsRef} className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detailed technical specifications and performance parameters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div
                key={key}
                className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-1000 ${
                  specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-blue-600 font-bold text-xl">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Applications */}
      <section ref={featuresRef} className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Key Features
              </h3>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
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
                {product.applications.map((application, index) => (
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