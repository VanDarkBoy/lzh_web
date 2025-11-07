'use client';

import Header from '../components/Header';
import ContactForm from './ContactForm';
import Footer from "@/app/components/Footer";
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';

export default function GetStartedPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header/>
            <main>
                <ContactForm/>
            </main>
            <Footer/>
            <WhatAPP/>
            <FloatingCountryFlags />
        </div>
    );
}
