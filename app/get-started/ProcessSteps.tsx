'use client';

export default function ProcessSteps() {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We discuss your vision, requirements, and sustainability goals to understand your project needs.',
      icon: 'ri-chat-3-line'
    },
    {
      number: '02',
      title: 'Site Assessment',
      description: 'Our experts conduct a thorough evaluation of your site to identify opportunities and challenges.',
      icon: 'ri-map-pin-line'
    },
    {
      number: '03',
      title: 'Custom Design',
      description: 'We create tailored sustainable solutions that align with your vision and environmental goals.',
      icon: 'ri-draft-line'
    },
    {
      number: '04',
      title: 'Project Implementation',
      description: 'Our skilled team brings your green building project to life with precision and quality.',
      icon: 'ri-hammer-line'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How We Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven process ensures your sustainable building project is completed efficiently and exceeds your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <i className={`${step.icon} text-2xl text-emerald-600`}></i>
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}