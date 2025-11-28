'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ContactForm from './ContactForm';
import { Types, defaultContent } from './types';
import Footer from "@/app/components/Footer";
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';

export default function GetStartedPage() {
    const [content, setContent] = useState<Types>(defaultContent);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ContactForm`);
                if (!response.ok) {
                    throw new Error('Failed to fetch contact form content');
                }
                const data: Types = await response.json();
                setContent(data);
            } catch (error) {
                console.error('Failed to load contact form content', error);
                setContent(defaultContent);
            }
        };
        fetchContent();

        return () => {
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
