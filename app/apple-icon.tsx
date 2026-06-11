import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7C3AED, #FF6B6B)",
        }}
      >
        <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
          <path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="#fff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
