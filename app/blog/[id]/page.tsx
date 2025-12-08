import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingCountryFlags from '../../components/FloatingCountryFlags';
import WhatAPP from '../../components/WhatAPP';
import {findBlogById} from '../data';
import {notFound} from 'next/navigation';

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

type BlogDetailPageProps = {
    params: {
        id: string;
    };
};

export default function BlogDetailPage({params}: BlogDetailPageProps) {
    const blog = findBlogById(params.id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-28 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6 mb-10">
                        <div className="text-sm text-blue-600 font-medium">
                            {dateFormatter.format(new Date(blog.pushDate))}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">{blog.title}</h1>
                        <p className="text-gray-600 text-lg">{blog.description}</p>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-lg mb-10">
                        <img src={blog.image} alt={blog.title} className="w-full h-[420px] object-cover" />
                    </div>

                    <article
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
                        dangerouslySetInnerHTML={{__html: blog.content}}
                    />
                </div>
            </main>
            <Footer />
            <WhatAPP />
            <FloatingCountryFlags />
        </div>
    );
}
