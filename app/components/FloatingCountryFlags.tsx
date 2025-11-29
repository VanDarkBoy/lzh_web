'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type {ReactElement} from 'react';

type Country = {
    code: string;
    name: string;
    href: string;
};

export default function FloatingCountryFlags(): ReactElement {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const loadCountries = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/otherArea`,
                    {signal: controller.signal},
                );

                if (!response.ok) {
                    console.error('Failed to fetch countries', response.statusText);
                    return;
                }

                const data = (await response.json()) as Country[];

                if (isMounted && Array.isArray(data)) {
                    setCountries(data);
                }
            } catch (error) {
                if (!(error instanceof DOMException && error.name === 'AbortError')) {
                    console.error('Failed to fetch countries', error);
                }
            }
        };

        void loadCountries();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <nav
            aria-label="Country flags"
            className="group fixed right-4 top-1/2 z-50 -translate-y-1/2"
        >
            {/* 不再用 max-height + overflow 裁切 */}
            <ul className="flex flex-col items-center gap-3">
                {countries.map((country, index) => (
                    <li
                        key={country.code}
                        className={`relative transition-all duration-700 ease-out transform ${
                            index > 2
                                ? 'opacity-0 pointer-events-none translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
                                : ''
                        }`}
                    >
                        <Link
                            href={country.href}
                            className="group/link relative flex items-center focus:outline-none"
                            aria-label={country.name}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
              <span
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-black/10 transition-transform duration-200 group-hover/link:-translate-x-1">
                <Image
                    src={`/flags/${country.code}.svg`}
                    alt={country.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                    priority
                />
              </span>
                            <span
                                className="pointer-events-none absolute right-full mr-3 origin-right scale-95 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover/link:scale-100 group-hover/link:opacity-100">
                {country.name}
              </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
