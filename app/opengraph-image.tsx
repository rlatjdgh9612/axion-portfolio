import { ImageResponse } from "next/og";

export const alt = "AXION";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <img src={LOGO} alt="AXION" width={600} height={160} />
      </div>
    ),
    { ...size }
  );
}
