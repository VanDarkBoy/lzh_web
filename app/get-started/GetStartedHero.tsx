
'use client';

import { useState } from 'react';

export default function GetStartedHero({ scrollY }: { scrollY: number }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.message.length > 500) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://readdy.ai/api/form/d1urkvufl5e5sapljjv0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-32 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20sustainable%20architecture%20with%20lush%20green%20living%20walls%20and%20solar%20panels%2C%20clean%20minimalist%20design%20with%20natural%20lighting%2C%20eco-friendly%20building%20materials%2C%20architectural%20photography%20with%20soft%20professional%20lighting%2C%20high%20quality%20cinematic%20composition%2C%20serene%20atmosphere&width=1920&height=1080&seq=get-started-hero&orientation=landscape')`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-900/80" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Green Building<span className="block text-emerald-400">Shop</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover our sustainable building products and eco-friendly solutions. Shop premium green materials for your next environmentally conscious project.
          </p>

          <div className="max-w-md mx-auto">
            <form 
              id="hero-contact-form" 
              onSubmit={handleSubmit} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              data-readdy-form
            >
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="What products are you interested in?"
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  <div className="text-white/60 text-xs mt-1 text-right">
                    {formData.message.length}/500
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="w-full bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Contact Sales'}
                </button>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-emerald-200 text-sm">
                  Thank you! Our sales team will contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
                  {formData.message.length > 500 
                    ? 'Message exceeds 500 character limit. Please shorten your message.'
                    : 'Something went wrong. Please try again.'
                  }
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}