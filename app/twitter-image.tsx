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
          background: "linear-gradient(135deg, #f3f8f4 0%, #d9eadf 100%)",
          color: "#14301f",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "#29ad81", display: "flex" }}>
          Smarter Home Philippines
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 24, display: "flex" }}>
          Smart home installation in Pampanga, Tarlac and Bulacan
        </div>
        <div style={{ fontSize: 34, marginTop: 32, color: "#3d5a47", display: "flex" }}>
          Lights, locks, cameras and aircon control, planned and installed.
        </div>
      </div>
    ),
    size,
  )
}
