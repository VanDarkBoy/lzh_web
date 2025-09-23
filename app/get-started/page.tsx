'use client';

import Header from '../components/Header';
import ContactForm from './ContactForm';

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <ContactForm />
      </main>
    </div>
  );
}
