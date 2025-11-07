'use client';

import Header from '../components/Header';
import ContactForm from './ContactForm';
import Footer from "@/app/components/Footer";
import WhatAPP from '../components/WhatAPP';

export default function GetStartedPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header/>
            <main>
                <ContactForm/>
            </main>
            <Footer/>
            <WhatAPP/>
        </div>
    );
}
