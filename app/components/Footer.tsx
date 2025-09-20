
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="w-full bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img 
                  src="https://static.readdy.ai/image/78fade42075db25ed5a2e70ff249826e/1e5877763b68d906496937d563800040.png"
                  alt="Lithium Valley Logo"
                  className="h-48 w-auto mb-4"
                />
              </div>
            </div>

            {/*<div>*/}
            {/*  <h4 className="text-xl font-semibold mb-6 text-white">快速链接</h4>*/}
            {/*  <ul className="space-y-3">*/}
            {/*    <li><Link href="/" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">首页</Link></li>*/}
            {/*    <li><Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">关于我们</Link></li>*/}
            {/*    <li><Link href="/products" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">产品中心</Link></li>*/}
            {/*    <li><Link href="/product-list" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">产品列表</Link></li>*/}
            {/*    <li><Link href="/download" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">下载中心</Link></li>*/}
            {/*    <li><Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">联系我们</Link></li>*/}
            {/*  </ul>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*  <h4 className="text-xl font-semibold mb-6 text-white">产品系列</h4>*/}
            {/*  <ul className="space-y-3">*/}
            {/*    <li><Link href="/products?category=residential" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">住宅储能系统</Link></li>*/}
            {/*    <li><Link href="/products?category=commercial" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">工商业储能</Link></li>*/}
            {/*    <li><Link href="/products?category=rv" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">房车储能</Link></li>*/}
            {/*    <li><Link href="/products?category=power" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-base">动力电池</Link></li>*/}
            {/*  </ul>*/}
            {/*</div>*/}

            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">联系方式</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center mr-4 mt-1">
                    <i className="ri-map-pin-line text-green-400 text-lg"></i>
                  </div>
                  <span className="text-gray-300 text-base leading-relaxed">东莞总部：东莞市樟木头镇<br />樟洋社区银洋路11号</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-green-400 text-lg"></i>
                  </div>
                  <span className="text-gray-300 text-base">+86 400-123-4567</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-green-400 text-lg"></i>
                  </div>
                  <span className="text-gray-300 text-base">info/sales@lithiumvalley.com</span>
                </li>
              </ul>
              
              {/* 社交媒体图标 */}
              <div className="mt-6">
                <h5 className="text-lg font-semibold mb-4 text-white">关注我们</h5>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/company/72668160/admin/dashboard/"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <i className="ri-linkedin-fill text-white text-lg"></i>
                  </a>
                  <a 
                    href="https://www.facebook.com/lithiumvalley/"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-700 rounded-full transition-colors cursor-pointer"
                    aria-label="Facebook"
                  >
                    <i className="ri-facebook-fill text-white text-lg"></i>
                  </a>
                  <a 
                    href="https://www.youtube.com/@LithiumValley"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
                    aria-label="YouTube"
                  >
                    <i className="ri-youtube-fill text-white text-lg"></i>
                  </a>
                  <a 
                    href="https://www.instagram.com/lithiumvalley"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-pink-600 rounded-full transition-colors cursor-pointer"
                    aria-label="Instagram"
                  >
                    <i className="ri-instagram-fill text-white text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base">
              © 2025 Lithium Valley. 版权所有
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer text-sm">隐私政策</Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer text-sm">服务条款</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
