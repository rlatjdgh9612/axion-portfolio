"use client";

import { motion, useReducedMotion } from "motion/react";

const stages = [
  ["01.기준 정의", "실행 기준", ["사용자·문제·목표 정의", "입력·출력 기준 설정", "품질 게이트·금지 규칙"]],
  ["02.문서 구조화", "단일 기준 문서", ["기획안·PRD·IA 구조화", "요구사항·예외·우선순위", "단일 기준 문서화"]],
  ["03.데이터 표준화", "프로젝트 데이터", ["화면·컴포넌트·토큰 매핑", "공통 데이터 스키마 정의", "재사용 규칙·버전 관리"]],
  ["04.병렬 실행", "Figma·React", ["Figma·React 병렬 실행", "토큰·컴포넌트 연동", "반응형 화면 구현"]],
  ["05.품질 검증", "Harness QA", ["디자인 정합성·접근성 검사", "기능·반응형·회귀 QA", "결과를 데이터·규칙에 반영"]],
] as const;

export function AxionWorkflow() {
  const reduced = useReducedMotion();

  return <div className="harness" aria-label="AXION AI Harness 흐름">
    <div className="harness-diagram">
      <div className="harness-node harness-node-start">기획안·PRD</div>
      <span className="harness-connector" aria-hidden="true" />
      <div className="harness-node">프로젝트 데이터</div>
      <span className="harness-connector harness-connector-into-branch" aria-hidden="true" />
      <div className="harness-branch" aria-label="Figma와 React 병렬 실행">
        <span>Figma 화면</span>
        <span>React 구현</span>
      </div>
      <span className="harness-connector harness-connector-out-branch" aria-hidden="true" />
      <div className="harness-node">디자인 정합성 검사</div>
      <span className="harness-connector" aria-hidden="true" />
      <div className="harness-node harness-node-end">반응형·접근성·기능 QA</div>
    </div>
    <div className="harness-stages">
      {stages.map(([step, title, bullets], index) => <motion.article key={step} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .32, delay: index * .06 }}>
        <span>{step}</span>
        <h3>{title}</h3>
        <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      </motion.article>)}
    </div>
    <span className="harness-feedback-arrow" aria-hidden="true" />
  </div>;
}
