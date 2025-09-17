
'use client';

import { useState, useRef, useEffect } from 'react';

interface ContactSectionProps {
  scrollY: number;
}

export default function ContactSection({ scrollY }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.length > 500) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://readdy.ai/api/form/d1urmc86rtq8loj8c7v0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white relative overflow-hidden"
      id="contact"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Peaceful%20natural%20landscape%20with%20tall%20grass%20swaying%20in%20wind%2C%20golden%20hour%20lighting%2C%20soft%20focus%20background%20with%20warm%20earth%20tones%2C%20serene%20countryside%20meadow%20at%20dusk%2C%20cinematic%20atmospheric%20photography%2C%20calm%20and%20tranquil%20nature%20scene%20with%20gentle%20movement&width=1920&height=1080&seq=contact-bg&orientation=landscape')`,
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-stone-900/70"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div 
            className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 sm:mb-8 leading-tight">
              Let's Build
              <br />
              <span className="text-emerald-300">Together</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed">
              Ready to create a space that nurtures both your vision and our planet? Let's discuss how we can bring sustainable innovation to your next project.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white"></i>
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Phone</p>
                  <p className="text-white/80 text-sm sm:text-base">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white"></i>
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Email</p>
                  <p className="text-white/80 text-sm sm:text-base">hello@greenbuildstudio.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white"></i>
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Office</p>
                  <p className="text-white/80 text-sm sm:text-base">123 Sustainable Way, Green City, GC 12345</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <form id="contact-form" onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-2xl" data-readdy-form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <div className="relative">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm appearance-none bg-white"
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="institutional">Institutional</option>
                      <option value="mixed-use">Mixed Use</option>
                      <option value="renovation">Renovation</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message * (Max 500 characters)
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={500}
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm"
                  placeholder="Tell us about your project vision and sustainability goals..."
                ></textarea>
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.message.length}/500
                </div>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-emerald-100 border border-emerald-400 text-emerald-700 text-sm">
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 text-sm">
                  {formData.message.length > 500 
                    ? 'Message exceeds 500 character limit. Please shorten your message.'
                    : 'Something went wrong. Please try again.'
                  }
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting || formData.message.length > 500}
                className="w-full bg-emerald-700 text-white py-3 sm:py-4 px-4 sm:px-6 hover:bg-emerald-800 disabled:bg-gray-400 transition-colors duration-300 font-medium whitespace-nowrap cursor-pointer rounded-full text-sm sm:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Start the Conversation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
