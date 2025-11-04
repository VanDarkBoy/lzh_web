'use client';

import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';

type FooterSocialLink = {
    name: string;
    label: string;
    url: string;
    icon: string;
};

type FooterContactSection = {
    addressLabel: string;
    address: string;
    addressIcon: string;
    hotlineLabel: string;
    hotline: string;
    hotlineIcon: string;
    businessLabel: string;
    businessEmail: string;
    businessIcon: string;
};

type FooterApiResponse = {
    logoUrl: string;
    description: string;
    contact: FooterContactSection;
    socialLinks: FooterSocialLink[];
    social: FooterSocialLink[];
    copyright: string;
};

const DEFAULT_DATA: Required<Omit<FooterApiResponse, 'contact'>> & { contact: Required<FooterContactSection> } = {
    logoUrl:
        'https://static.readdy.ai/image/78fade42075db25ed5a2e70ff249826e/1e5877763b68d906496937d563800040.png',
    description:
        'Lithium Valley 致力于为全球客户提供高效、安全的储能解决方案，推动绿色能源的普及与应用。',
    contact: {
        addressLabel: '东莞总部',
        address: '东莞市樟木头镇樟洋社区银洋路11号',
        addressIcon: 'ri-map-pin-line',
        hotlineLabel: '服务热线',
        hotline: '+86 400-123-4567',
        hotlineIcon: 'ri-phone-line',
        businessLabel: '商务合作',
        businessEmail: 'info/sales@lithiumvalley.com',
        businessIcon: 'ri-mail-line',
    },
    socialLinks: [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/72668160/admin/dashboard/',
            icon: 'ri-linkedin-fill',
            label: ""
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/lithiumvalley/',
            icon: 'ri-facebook-fill',
            label: ""
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@LithiumValley',
            icon: 'ri-youtube-fill',
            label: ""
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/lithiumvalley',
            icon: 'ri-instagram-fill',
            label: ""
        },
    ],
    social: [],
    copyright: '© 2025 Lithium Valley. 版权所有',
};

export default function Footer() {
    const [footerData, setFooterData] = useState<FooterApiResponse>(DEFAULT_DATA);

    useEffect(() => {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE;
        if (!apiBase) {
            return;
        }

        const controller = new AbortController();

        const fetchFooter = async () => {
            try {
                const response = await fetch(`${apiBase}/api/footer`, {
                    method: 'GET',
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch footer data');
                }

                const payload: FooterApiResponse | { data: FooterApiResponse } = await response.json();
                const normalizedData = 'data' in payload ? payload.data : payload;

                setFooterData((current) => ({
                    ...current,
                    ...normalizedData,
                    contact: {
                        ...current.contact,
                        ...normalizedData.contact,
                    },
                    socialLinks:
                        (Array.isArray(normalizedData.socialLinks) && normalizedData.socialLinks.length > 0
                            ? normalizedData.socialLinks
                            : undefined) ??
                        (Array.isArray(normalizedData.social) && normalizedData.social.length > 0
                            ? normalizedData.social
                            : undefined) ??
                        current.socialLinks,
                }));
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Failed to load footer data', error);
                }
            }
        };

        fetchFooter();

        return () => {
            controller.abort();
        };
    }, []);

    const socialLinks = useMemo(() => {
        const links = footerData.socialLinks ?? footerData.social ?? [];
        return links.length > 0 ? links : DEFAULT_DATA.socialLinks;
    }, [footerData.social, footerData.socialLinks]);

    const contact = useMemo(() => ({
        ...DEFAULT_DATA.contact,
        ...footerData.contact,
    }), [footerData.contact]);

    return (
        <footer className="bg-gray-900 text-white w-full">
            <div className="w-full bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div>
                            <img
                                src={footerData.logoUrl ?? DEFAULT_DATA.logoUrl}
                                alt="Lithium Valley Logo"
                                className="h-24 w-auto mb-6"
                            />
                            <p className="text-gray-400 text-base leading-relaxed max-w-md">
                                {footerData.description ?? DEFAULT_DATA.description}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-6 text-white">联系方式</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-300">
                                <li className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400 mt-1">
                                        <i className={`${contact.addressIcon ?? DEFAULT_DATA.contact.addressIcon} text-lg`}></i>
                                    </div>
                                    <span className="leading-relaxed">
                    {contact.addressLabel}
                                        {contact.address ? `：${contact.address}` : ''}
                  </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400">
                                        <i className={`${contact.hotlineIcon ?? DEFAULT_DATA.contact.hotlineIcon} text-lg`}></i>
                                    </div>
                                    <div>
                                        <span className="block">{contact.hotlineLabel}</span>
                                        <span className="text-gray-200 font-semibold">{contact.hotline}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400">
                                        <i className={`${contact.businessIcon ?? DEFAULT_DATA.contact.businessIcon} text-lg`}></i>
                                    </div>
                                    <div>
                                        <span className="block">{contact.businessLabel}</span>
                                        <span className="text-gray-200 font-semibold">{contact.businessEmail}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-6 text-white">关注我们</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={`${link.name ?? 'social'}-${index}`}
                                        href={link.url ?? '#'}
                                        className="flex flex-col items-center gap-3 rounded-2xl bg-gray-800/60 border border-gray-800 hover:border-green-400 hover:bg-gray-800 transition-colors cursor-pointer p-4"
                                        aria-label={link.name ?? link.label ?? 'Social link'}
                                        target={link.url ? '_blank' : undefined}
                                        rel={link.url ? 'noopener noreferrer' : undefined}
                                    >
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900">
                      <i className={`${link.icon ?? 'ri-share-fill'} text-white text-xl`}></i>
                    </span>
                                        <span className="text-sm text-gray-300">{link.name ?? link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-base">
                            {footerData.copyright ?? DEFAULT_DATA.copyright}
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="#"
                                  className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer text-sm">
                                隐私政策
                            </Link>
                            <Link href="#"
                                  className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer text-sm">
                                服务条款
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
