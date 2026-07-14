"use client";

import {
  Building2,
  Truck,
  Package,
  ArrowRight,
  Loader2,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80";

const SERVICES = [
  {
    icon: Building2,
    title: "Verified Hostels",
    description: "Find trusted student accommodation near your campus.",
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Move to and from campus without the stress.",
  },
  {
    icon: Package,
    title: "Storage",
    description: "Keep your belongings safe during vacations.",
  },
];

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97l3.05 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

export default function LoginPanel({
  onGoogleLogin,
  loading,
  error,
}) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* LEFT */}

      <section
        className="relative md:w-1/2 h-[40vh] md:h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30,30,30,.45),rgba(20,20,20,.75)),url(${HERO_IMAGE})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 text-white">

          <p className="uppercase tracking-[0.3em] text-xs font-semibold opacity-80">
            Welcome to HostelHubb
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Student accommodation made simple.
          </h1>

          <p className="mt-5 text-white/90 leading-relaxed max-w-xl">
            HostelHubb connects students across Ghana to verified
            hostels, trusted transport providers and secure storage
            facilities.
          </p>

          <div className="mt-10 grid gap-4">

            {SERVICES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4"
              >
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  <p className="text-sm text-white/75">
                    {description}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* RIGHT */}

      <section className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-900">
            Sign in
          </h2>

          <p className="mt-2 text-gray-500">
            Continue to book hostels, transport and storage.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={onGoogleLogin}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-medium transition hover:bg-gray-50 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Signing in...
              </>
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
                <ArrowRight
                  size={18}
                  className="ml-auto"
                />
              </>
            )}
          </button>

          <p className="mt-8 text-center text-xs leading-relaxed text-gray-500">
            By continuing you agree to HostelHubb's Terms of Service
            and Privacy Policy.
          </p>

        </div>

      </section>

    </main>
  );
}