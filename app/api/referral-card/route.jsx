import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code") || "HOSTELHUBB";
  const name = "I";

  const bannerUrl = `${origin}/og-banner.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#B3261E",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background image */}
        <img
          src={bannerUrl}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            opacity: 0.35,
          }}
        />

        {/* Dark scrim for contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundColor: "rgba(120, 20, 15, 0.72)",
          }}
        />

        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "0 70px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 46,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            HOSTEL HUBB
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#fff",
              marginTop: 14,
              textAlign: "center",
              maxWidth: 940,
              lineHeight: 1.35,
            }}
          >
            {name} use HostelHubb for accommodation, storage & transport — and I'm inviting you to join, so we both save and earn.
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
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            {code}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "rgba(255,255,255,0.85)",
              marginTop: 14,
            }}
          >
            Use this code when you are booking any of the services.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}