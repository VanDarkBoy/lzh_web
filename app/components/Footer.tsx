
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="w-full bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <img
                src="https://static.readdy.ai/image/78fade42075db25ed5a2e70ff249826e/1e5877763b68d906496937d563800040.png"
                alt="Lithium Valley Logo"
                className="h-24 w-auto mb-6"
              />
              <p className="text-gray-400 text-base leading-relaxed max-w-md">
                Lithium Valley 致力于为全球客户提供高效、安全的储能解决方案，推动绿色能源的普及与应用。
              </p>
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
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400 mt-1">
                    <i className="ri-map-pin-line text-lg"></i>
                  </div>
                  <span className="leading-relaxed">东莞总部：东莞市樟木头镇<br />樟洋社区银洋路11号</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400">
                    <i className="ri-phone-line text-lg"></i>
                  </div>
                  <div>
                    <span className="block">服务热线</span>
                    <span className="text-gray-200 font-semibold">+86 400-123-4567</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400">
                    <i className="ri-mail-line text-lg"></i>
                  </div>
                  <div>
                    <span className="block">商务合作</span>
                    <span className="text-gray-200 font-semibold">info/sales@lithiumvalley.com</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-green-400">
                    <i className="ri-time-line text-lg"></i>
                  </div>
                  <div>
                    <span className="block">服务时间</span>
                    <span className="text-gray-200 font-semibold">周一至周五 09:00-18:00</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">关注我们</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a
                  href="https://www.linkedin.com/company/72668160/admin/dashboard/"
                  className="flex flex-col items-center gap-3 rounded-2xl bg-gray-800/60 border border-gray-800 hover:border-green-400 hover:bg-gray-800 transition-colors cursor-pointer p-4"
                  aria-label="LinkedIn"
                >
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900">
                    <i className="ri-linkedin-fill text-white text-xl"></i>
                  </span>
                  <span className="text-sm text-gray-300">LinkedIn</span>
                </a>
                <a
                  href="https://www.facebook.com/lithiumvalley/"
                  className="flex flex-col items-center gap-3 rounded-2xl bg-gray-800/60 border border-gray-800 hover:border-green-400 hover:bg-gray-800 transition-colors cursor-pointer p-4"
                  aria-label="Facebook"
                >
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900">
                    <i className="ri-facebook-fill text-white text-xl"></i>
                  </span>
                  <span className="text-sm text-gray-300">Facebook</span>
                </a>
                <a
                  href="https://www.youtube.com/@LithiumValley"
                  className="flex flex-col items-center gap-3 rounded-2xl bg-gray-800/60 border border-gray-800 hover:border-green-400 hover:bg-gray-800 transition-colors cursor-pointer p-4"
                  aria-label="YouTube"
                >
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900">
                    <i className="ri-youtube-fill text-white text-xl"></i>
                  </span>
                  <span className="text-sm text-gray-300">YouTube</span>
                </a>
                <a
                  href="https://www.instagram.com/lithiumvalley"
                  className="flex flex-col items-center gap-3 rounded-2xl bg-gray-800/60 border border-gray-800 hover:border-green-400 hover:bg-gray-800 transition-colors cursor-pointer p-4"
                  aria-label="Instagram"
                >
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900">
                    <i className="ri-instagram-fill text-white text-xl"></i>
                  </span>
                  <span className="text-sm text-gray-300">Instagram</span>
                </a>
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
