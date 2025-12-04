'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatAPP from './components/WhatAPP';
import FloatingCountryFlags from './components/FloatingCountryFlags';
import HiddenSeoContent from './components/HiddenSeoContent';
import StructuredData from './components/StructuredData';
import HomePage from './components/HomePage';

export default function Home() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header/>
            <StructuredData/>
            <HomePage/>
            <Footer/>
            <WhatAPP />
            <FloatingCountryFlags />
            <HiddenSeoContent />
        </div>
    );
}
