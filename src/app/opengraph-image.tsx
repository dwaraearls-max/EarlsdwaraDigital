import { siteConfig } from "@/lib/data";
import { ImageResponse } from "next/og";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #081525 0%, #0f2137 45%, #081525 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            display: "flex",
            background: "radial-gradient(circle, rgba(201,164,108,0.35) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #e0c08a, #c9a46c)",
              color: "#081525",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            ED
          </div>
          <span style={{ fontSize: 36, fontWeight: 600, color: "#eceef1", letterSpacing: -1 }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#eceef1",
              lineHeight: 1.15,
              letterSpacing: -2,
            }}
          >
            Premium websites that grow businesses
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#a8b0ba",
              lineHeight: 1.45,
            }}
          >
            {siteConfig.tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 24, color: "#c9a46c", fontWeight: 600 }}>
            Website Design · Development · SEO
          </span>
          <span style={{ fontSize: 22, color: "#a8b0ba" }}>
            {siteConfig.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
