import { siteConfig } from "@/lib/data";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 80px",
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
            background: "radial-gradient(circle, rgba(201,164,108,0.35) 0%, transparent 70%)",
          }}
        />

        <img
          src={logoSrc}
          alt=""
          width={520}
          height={360}
          style={{ objectFit: "contain", marginBottom: 40 }}
        />

        <span
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#eceef1",
            lineHeight: 1.2,
            letterSpacing: -1,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Premium websites that grow businesses
        </span>

        <span
          style={{
            marginTop: 16,
            fontSize: 24,
            color: "#a8b0ba",
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </span>

        <span
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 22,
            color: "#c9a46c",
            fontWeight: 600,
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </span>
      </div>
    ),
    { ...size },
  );
}
