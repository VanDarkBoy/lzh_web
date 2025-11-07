import Image from 'next/image';
import type {ReactElement} from 'react';

const COUNTRIES: {code: string; name: string}[] = [
    {code: 'za', name: 'South Africa 南非'},
    {code: 'ng', name: 'Nigeria 尼日利亚'},
    {code: 'ke', name: 'Kenya 肯尼亚'},
    {code: 'es', name: 'Spain 西班牙'},
    {code: 'de', name: 'Germany 德国'},
    {code: 'it', name: 'Italy 意大利'},
    {code: 'ir', name: 'Iran 伊朗'},
];

export default function FloatingCountryFlags(): ReactElement {
    return (
        <nav
            aria-label="Country flags"
            className="fixed right-4 top-1/2 z-50 -translate-y-1/2"
        >
            <ul className="flex flex-col items-center gap-3">
                {COUNTRIES.map((country) => (
                    <li key={country.code} className="group relative">
                        <span className="sr-only">{country.name}</span>
                        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-black/10 transition-transform duration-200 group-hover:-translate-x-1">
                            <Image
                                src={`/flags/${country.code}.svg`}
                                alt={country.name}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </span>
                        <span className="pointer-events-none absolute right-full mr-3 origin-right scale-95 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                            {country.name}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
