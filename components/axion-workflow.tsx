"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = ["기획안·PRD", "프로젝트 데이터", "Figma 설계", "React 구현", "디자인 정합성", "반응형·접근성·기능 QA"];

export function AxionWorkflow() {
  const reduced = useReducedMotion();
  return <div className="workflow" aria-label="AXION AI Harness 흐름">{steps.map((step, index) => <motion.div key={step} className="workflow-step" initial={reduced ? false : { opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .32, delay: index * .1 }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < steps.length - 1 && <i aria-hidden="true">→</i>}</motion.div>)}</div>;
}
