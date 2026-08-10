import Link from "next/link";
import Image from "next/image";
import { ProjectButton, ResumeLink } from "./ui";

function MailIcon() {
  return <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 5.25h16.5c.966 0 1.75.784 1.75 1.75v10c0 .966-.784 1.75-1.75 1.75H3.75A1.75 1.75 0 0 1 2 17V7c0-.966.784-1.75 1.75-1.75Zm.41 2 7.84 5.73 7.84-5.73H4.16Zm15.84 2.17-7.263 5.31a1.25 1.25 0 0 1-1.474 0L4 9.42V17h16V9.42Z" fill="currentColor"/></svg>;
}

function PhoneIcon() {
  return <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 2.75c.5 0 .96.28 1.18.73l1.7 3.42c.25.5.16 1.1-.23 1.5l-1.4 1.4a15.2 15.2 0 0 0 6.33 6.33l1.4-1.4c.4-.39 1-.48 1.5-.23l3.42 1.7c.45.22.73.68.73 1.18v2.87c0 .72-.58 1.3-1.3 1.3C10.29 21.55 2.45 13.71 2.45 4.05c0-.72.58-1.3 1.3-1.3h2.87Z" fill="currentColor"/></svg>;
}

export function ContactSection() {
  return <section className="contact-section"><div className="container contact-inner"><span>함께 성장할 기회를 기다립니다</span><h2>채용제안, 협업, 프리랜서 문의까지<br/>언제든 편하게 연락해주세요</h2><p>사용자와 비즈니스에 가치를 만드는 프로젝트를 함께 만들어가고 싶습니다</p><div className="contact-links"><a href="mailto:rlatjdgh5548@gmail.com" data-analytics-event="contact_click" data-analytics-contact-method="email" data-analytics-location="contact_section"><MailIcon/><span>rlatjdgh5548@gmail.com</span></a><a href="tel:+821057567314" data-analytics-event="contact_click" data-analytics-contact-method="phone" data-analytics-location="contact_section"><PhoneIcon/><span>010-5756-7314</span></a></div></div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-brand"><Link className="wordmark" href="/"><Image src="/assets/ui/logo-light.png" alt="AXION" width={173} height={46} loading="eager" /></Link><p>더 나은 서비스를 기획하고, 더 나은 사용자 경험을 디자인합니다.</p></div><div className="footer-actions"><ProjectButton analyticsLocation="footer"/><ResumeLink analyticsLocation="footer"/></div><small>©2026 AXION. All Rights Reserved Designed &amp; Developed by Kim Seong Ho</small></div></footer>;
}
