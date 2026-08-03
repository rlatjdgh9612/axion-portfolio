"use client";

import { motion, useReducedMotion } from "motion/react";

const stages = [
  ["01", "기준 정의", "실행 기준", "사용자 · 문제 · 목표 정의"],
  ["02", "문서 구조화", "단일 기준 문서", "기획안 · PRD · IA 구조화"],
  ["03", "데이터 표준화", "프로젝트 데이터", "화면 · 컴포넌트 · 토큰 매핑"],
  ["04", "병렬 실행", "Figma · React", "디자인과 구현을 병렬로 실행"],
  ["05", "품질 검증", "Harness QA", "정합성 · 반응형 · 접근성 검사"],
] as const;

export function AxionWorkflow() {
  const reduced = useReducedMotion();

  return <div className="harness" aria-label="AXION AI Harness 흐름">
    <div className="harness-flow">
      <div className="harness-node">기획안 · PRD</div><i aria-hidden="true">→</i>
      <div className="harness-node">프로젝트 데이터</div><i aria-hidden="true">→</i>
      <div className="harness-branch"><span>Figma 화면</span><span>React 구현</span></div><i aria-hidden="true">→</i>
      <div className="harness-node">디자인 정합성 검사</div><i aria-hidden="true">→</i>
      <div className="harness-node">반응형 · 접근성 · 기능 QA</div>
    </div>
    <div className="harness-stages">
      {stages.map(([number, title, label, description], index) => <motion.article key={number} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .32, delay: index * .06 }}>
        <span>{number}</span><h3>{title}</h3><strong>{label}</strong><p>{description}</p>
      </motion.article>)}
    </div>
  </div>;
}
