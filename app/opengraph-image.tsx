import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Forja - Treine, evolua e conquiste";
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
          padding: "90px",
          background:
            "linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #8B5CF6 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #FFB020, #FF6B6B)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="#fff" />
            </svg>
          </div>
          <div style={{ fontSize: 52, fontWeight: 800 }}>Forja</div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Treine como um jogo. Evolua de verdade.
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 34,
            color: "rgba(255,255,255,0.82)",
            maxWidth: 880,
          }}
        >
          O app de treinos gamificado para personal trainers e seus alunos.
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            gap: 16,
            fontSize: 26,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <span
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
            }}
          >
            App Store
          </span>
          <span
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
            }}
          >
            Google Play
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
