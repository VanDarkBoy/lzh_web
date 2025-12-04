import Script from 'next/script';

const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Lithium Valley 10kWh Home ESS',
    image: 'https://lithiumvalley.lt/images/product1.jpg',
    brand: 'Lithium Valley',
    description: '10kWh home energy storage system with LiFePO4 battery',
    sku: 'LV-10KWH',
    offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '2999',
        availability: 'https://schema.org/InStock'
    }
};

const StructuredData = () => {
    const structuredData = productSchema;

    return (
        <Script
            id="home-structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData, null, 2)}}
        />
    );
};

export default StructuredData;
