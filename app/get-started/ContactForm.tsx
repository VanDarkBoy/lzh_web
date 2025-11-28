'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import {
  ContactFormContent,
  FormData,
  initialFormState
} from './ContactForm.ts';

export {
  ContactFormContent,
  FormData,
  defaultContent,
  initialFormState
} from './ContactForm.ts';

type ContactFormProps = {
  content: ContactFormContent;
};

export default function ContactForm({ content }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/Inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.code === 200) {
        setSuccessMessage(content.successMessage);
        setFormData(initialFormState);
      } else {
        setErrorMessage(data?.msg || content.failureMessage);
      }
    } catch (error) {
      setErrorMessage(content.networkErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_55%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:text-left">
          <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Get started</span>
          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-300 sm:text-xl lg:max-w-3xl">
            {content.heroDescription}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_minmax(0,_480px)] lg:items-start">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                <i className="ri-customer-service-2-line text-emerald-300"></i>
              </div>
              <h2 className="text-2xl font-semibold">{content.serviceTitle}</h2>
              <p className="mt-3 text-sm text-slate-300">
                {content.serviceDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                <i className="ri-flashlight-line text-emerald-300"></i>
              </div>
              <h2 className="text-2xl font-semibold">{content.solutionTitle}</h2>
              <p className="mt-3 text-sm text-slate-300">
                {content.solutionDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                <i className="ri-shield-check-line text-emerald-300"></i>
              </div>
              <h2 className="text-2xl font-semibold">{content.supportTitle}</h2>
              <p className="mt-3 text-sm text-slate-300">
                {content.supportDescription}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl shadow-emerald-500/10 ring-1 ring-slate-200/60 sm:p-8">
            {successMessage ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <i className="ri-check-line text-3xl text-emerald-600"></i>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {content.successHeading}
                </h3>
                <p className="mt-4 max-w-sm text-base text-slate-600">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessMessage('')}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {content.continueButton}
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {content.nameLabel}
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={content.namePlaceholder}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {content.companyLabel}
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="例如：Lithium Valley"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      type="text"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {content.emailLabel}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {content.phoneLabel}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={content.phonePlaceholder}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="product"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {content.productLabel}
                  </label>
                  <input
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder={content.productPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    type="text"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {content.inquiryLabel}
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    rows={5}
                    maxLength={600}
                    placeholder={content.inquiryPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    {formData.inquiry.length}/600
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
                >
                  {isSubmitting ? content.submittingText : content.submitText}
                </button>
                <p className="text-center text-xs text-slate-400">
                  {content.contactFollowUp}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
