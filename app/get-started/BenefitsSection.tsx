'use client';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: 'ri-leaf-line',
      title: 'Environmental Impact',
      description: 'Reduce your carbon footprint by up to 40% with our sustainable building practices and eco-friendly materials.'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Cost Savings',
      description: 'Save 20-30% on energy costs with efficient systems and smart design that pays for itself over time.'
    },
    {
      icon: 'ri-home-heart-line',
      title: 'Healthier Living',
      description: 'Improve indoor air quality and create healthier environments with non-toxic materials and better ventilation.'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Increased Value',
      description: 'Boost property value by 15-20% with green certifications and sustainable features that buyers seek.'
    },
    {
      icon: 'ri-award-line',
      title: 'Certifications',
      description: 'Achieve LEED, ENERGY STAR, and other green building certifications that enhance your project\'s credibility.'
    },
    {
      icon: 'ri-recycle-line',
      title: 'Future-Proof',
      description: 'Build for tomorrow with resilient designs that adapt to changing environmental and regulatory requirements.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Green Building?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sustainable construction isn't just good for the planet—it's smart business that delivers measurable benefits for years to come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group hover:bg-gray-50 rounded-2xl p-8 transition-colors">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6 group-hover:bg-emerald-200 transition-colors">
                <i className={`${benefit.icon} text-2xl text-emerald-600`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}