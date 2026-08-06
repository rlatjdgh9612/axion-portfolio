import { ImageResponse } from "next/og";

export const alt = "AXION — Product Designer & Service Planner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO = "https://axion-portfolio-one.vercel.app/assets/ui/logo-light.png";

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
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="AXION" width={372} height={99} />
        <div style={{ marginTop: 48, fontSize: 46, fontWeight: 700, color: "#02002c" }}>
          Product Designer &amp; Service Planner
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 18, fontSize: 27, color: "#72757b" }}>
          <span>SERVICE PLANNING</span>
          <span>·</span>
          <span>UX/UI DESIGN</span>
          <span>·</span>
          <span>AI &amp; AX STRATEGY</span>
        </div>
        <div style={{ marginTop: 44, fontSize: 30, fontWeight: 700, color: "#aeb2ba" }}>
          2026 PORTFOLIO
        </div>
      </div>
    ),
    { ...size }
  );
}
