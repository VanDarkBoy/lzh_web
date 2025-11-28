'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ContactForm, { ContactFormContent, defaultContent } from './ContactForm';
import Footer from "@/app/components/Footer";
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';

export default function GetStartedPage() {
    const [content, setContent] = useState<ContactFormContent>(defaultContent);

    useEffect(() => {
        let isMounted = true;

        const fetchContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ContactForm`);
                if (!response.ok) {
                    throw new Error('Failed to fetch contact form content');
                }

                const result = await response.json();
                const payload: Partial<ContactFormContent> = result?.data ?? result;

                if (isMounted && payload && typeof payload === 'object') {
                    setContent((prev) => ({ ...prev, ...payload }));
                }
            } catch (error) {
                console.error('Failed to load contact form content', error);
            }
        };

        fetchContent();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-950">
            <Header/>
            <main>
                <ContactForm content={content}/>
            </main>
            <Footer/>
            <WhatAPP/>
            <FloatingCountryFlags />
        </div>
    );
}
