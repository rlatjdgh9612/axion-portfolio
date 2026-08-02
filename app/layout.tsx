import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: { default: "AXION | Product Designer & Service Planner", template: "%s | AXION" },
  description: "서비스 기획과 UX/UI 디자인, AI Workflow를 연결하는 김성호의 Product Design 포트폴리오입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Script id="theme-script" strategy="beforeInteractive">{`try{const t=localStorage.getItem('axion-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}`}</Script>
      </head>
      <body><ThemeProvider><Header/><main>{children}</main><Footer/></ThemeProvider></body>
    </html>
  );
}
