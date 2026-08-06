import { ImageResponse } from "next/og";

export const alt = "AXION — Product Designer & Service Planner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#02002c",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: "0.08em" }}>AXION</div>
        <div style={{ marginTop: 28, fontSize: 44, color: "#c9cbd4" }}>
          Product Designer &amp; Service Planner
        </div>
        <div style={{ marginTop: 56, display: "flex", gap: 20, fontSize: 26, color: "#8d90a0" }}>
          <span>SERVICE PLANNING</span>
          <span>·</span>
          <span>UX/UI DESIGN</span>
          <span>·</span>
          <span>AI &amp; AX STRATEGY</span>
        </div>
        <div style={{ marginTop: 44, fontSize: 30, fontWeight: 700, color: "#5a5d70" }}>
          2026 PORTFOLIO
        </div>
      </div>
    ),
    { ...size }
  );
}
