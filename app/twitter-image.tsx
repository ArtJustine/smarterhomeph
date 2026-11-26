import { ImageResponse } from "next/og"

export const alt = "Smarter Home Philippines: smart home installation in Pampanga, Tarlac and Bulacan"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          padding: "80px",
          background: "linear-gradient(135deg, #0c0e24 0%, #23267f 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "#ff9f1c", display: "flex" }}>
          Smarter Home Philippines
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 24, display: "flex" }}>
          Smart home installation in Pampanga, Tarlac and Bulacan
        </div>
        <div style={{ fontSize: 34, marginTop: 32, color: "#c7c9f5", display: "flex" }}>
          Lights, locks, cameras and aircon control, planned and installed.
        </div>
      </div>
    ),
    size,
  )
}
