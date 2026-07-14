import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || "HOSTELHUBB";
  const name = searchParams.get("name") || "A HostelHubb user";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#B3261E",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 48, fontWeight: 700, color: "#fff" }}>
          HOSTEL HUBB
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#fff",
            marginTop: 10,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {name} invited you to save on storage & transport
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: "16px 36px",
            fontSize: 34,
            fontWeight: 700,
            color: "#B3261E",
            letterSpacing: 4,
          }}
        >
          {code}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}