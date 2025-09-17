
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';  // 使用 GeistSans
import { GeistMono } from 'geist/font/mono';  // 使用 GeistMono
import {  Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})



export const metadata: Metadata = {
  title: "储能系统解决方案 | 家用与商用储能电池 | Lithium Valley",
  description: "Lithium Valley 提供高安全、模块化的锂电池储能系统，涵盖住宅与商业应用，助力绿色能源与可持续发展。",
  keywords: "储能系统、家用储能电池、商用储能方案、LiFePO₄ 电池、绿色能源",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning={true}>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
