"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, SunIcon } from "./icons";
import { useTheme } from "./theme-provider";

const nav = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/projects/all", label: "프로젝트" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-menu] a,[data-menu] button"));
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="wordmark" href="/" aria-label="AXION 홈">
            <Image src="/assets/ui/logo-light.png" alt="AXION" width={120} height={28} priority />
          </Link>
          <div className="header-actions">
            <button className="icon-button" type="button" onClick={toggle} aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"} data-analytics-event="theme_change" data-analytics-theme={theme === "light" ? "dark" : "light"}>
              {theme === "light" ? <Image src="/assets/ui/theme-light.svg" alt="" width={22} height={22} /> : <SunIcon />}
            </button>
            <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="global-menu">
              <span className="sr-only">전체 메뉴 열기</span>
              <Image src="/assets/ui/menu-light.svg" alt="" width={22} height={22} />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div id="global-menu" className="menu-overlay" role="dialog" aria-modal="true" aria-label="전체 메뉴" data-menu>
          <div className="container menu-shell">
            <div className="menu-top">
              <Link className="wordmark" href="/" onClick={() => setOpen(false)}><Image src="/assets/ui/logo-light.png" alt="AXION" width={120} height={28} /></Link>
              <div className="header-actions">
                <button className="icon-button" type="button" onClick={toggle} aria-label="테마 전환" data-analytics-event="theme_change" data-analytics-theme={theme === "light" ? "dark" : "light"}>{theme === "light" ? <Image src="/assets/ui/theme-light.svg" alt="" width={22} height={22} /> : <SunIcon />}</button>
                <button ref={closeRef} className="menu-close" type="button" onClick={() => setOpen(false)} aria-label="전체 메뉴 닫기">×</button>
              </div>
            </div>
            <nav className="menu-nav">
              {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowIcon /></Link>)}
            </nav>
            <p className="menu-copy">©2026 AXION. All Rights Reserved Designed &amp; Developed by Kim Seong Ho</p>
          </div>
        </div>
      )}
    </>
  );
}
