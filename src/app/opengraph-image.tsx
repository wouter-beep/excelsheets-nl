import { ImageResponse } from "next/og";

export const alt = "Excelsheets.nl: Excel op maat, precies zoals jouw bedrijf werkt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Standaard deelafbeelding: merkkleuren en een raster van 'levende cellen'. */
export default function OgImage() {
  const cells = Array.from({ length: 48 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#073B2A", color: "#F8FAF7", padding: 72, position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: 60, top: 60, display: "flex", flexWrap: "wrap", width: 420, gap: 10 }}>
          {cells.map((i) => (
            <div key={i} style={{ width: 60, height: 34, borderRadius: 6, background: [3, 9, 14, 20, 27, 33, 38, 44].includes(i) ? "#18B979" : "rgba(203,248,224,0.10)" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: 640 }}>
          <div style={{ fontSize: 28, color: "#CBF8E0", letterSpacing: 2 }}>EXCELSHEETS.NL</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>Excel op maat.</div>
          <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15, marginTop: 8, color: "#18B979" }}>Precies zoals jouw bedrijf werkt.</div>
        </div>
      </div>
    ),
    size,
  );
}
