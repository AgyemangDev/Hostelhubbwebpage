"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Users,
  ShieldCheck,
  Calendar,
  LogOut,
  Pencil,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="rounded-xl bg-gray-100 p-3">
        <Icon size={18} className="text-[#9a0b0d]" />
      </div>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-gray-900 font-medium break-words">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();

  const {
    student,
    firebaseUser,
    logout,
    initializing,
  } = useAuth();

  const initials = useMemo(() => {
    if (!student) return "?";

    return `${student.first_name?.[0] || ""}${student.surname?.[0] || ""}`.toUpperCase();
  }, [student]);

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  if (initializing) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="animate-pulse space-y-6">

            <div className="h-48 rounded-3xl bg-white" />

            <div className="grid gap-6 lg:grid-cols-3">

              <div className="lg:col-span-2 h-96 rounded-3xl bg-white" />

              <div className="h-96 rounded-3xl bg-white" />

            </div>

          </div>
        </div>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

        <div className="max-w-md rounded-3xl bg-white p-10 shadow-lg text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#9a0b0d]/10">
            <User className="text-[#9a0b0d]" size={34} />
          </div>

          <h1 className="text-2xl font-bold">
            You're not signed in
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in to manage your HostelHubb account.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-8 rounded-xl bg-[#9a0b0d] px-6 py-3 font-semibold text-white hover:bg-[#7b0809]"
          >
            Sign In
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">

      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}

        <section className="rounded-3xl bg-white shadow-sm border border-gray-200 p-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#9a0b0d] text-4xl font-bold text-white">
              {initials}
            </div>

            <div className="flex-1">

              <h1 className="text-3xl font-bold text-gray-900">
                {student.first_name} {student.surname}
              </h1>

              <p className="mt-2 text-gray-500">
                {student.institution || "Institution not added"}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  Student Account
                </span>

                {firebaseUser?.emailVerified && (
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    Verified Email
                  </span>
                )}

              </div>

            </div>

          </div>

        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            <section className="rounded-3xl border border-gray-200 bg-white p-8">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <button
                  disabled
                  className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-gray-400"
                >
                  <Pencil size={16} />
                  Edit
                </button>

              </div>

              <div className="divide-y">

                <Detail
                  icon={User}
                  label="First Name"
                  value={student.first_name}
                />

                <Detail
                  icon={User}
                  label="Surname"
                  value={student.surname}
                />

                <Detail
                  icon={Mail}
                  label="Email"
                  value={firebaseUser?.email}
                />

                <Detail
                  icon={Phone}
                  label="Phone"
                  value={student.phone_number}
                />

                <Detail
                  icon={Users}
                  label="Gender"
                  value={student.gender}
                />

                <Detail
                  icon={GraduationCap}
                  label="Institution"
                  value={student.institution}
                />

              </div>

            </section>

          </div>

          {/* RIGHT */}

          <div className="space-y-8">

            <section className="rounded-3xl border border-gray-200 bg-white p-6">

              <h2 className="mb-6 text-lg font-bold">
                Account
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    className="text-green-600"
                    size={20}
                  />

                  <div>

                    <p className="font-medium">
                      Email Verification
                    </p>

                    <p className="text-sm text-gray-500">
                      {firebaseUser?.emailVerified
                        ? "Verified"
                        : "Not Verified"}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Calendar
                    className="text-[#9a0b0d]"
                    size={20}
                  />

                  <div>

                    <p className="font-medium">
                      Member Since
                    </p>

                    <p className="text-sm text-gray-500">
                      {firebaseUser?.metadata?.creationTime || "-"}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <User
                    className="text-[#9a0b0d]"
                    size={20}
                  />

                  <div>

                  </div>

                </div>

              </div>

            </section>

            <section className="rounded-3xl border border-gray-200 bg-white overflow-hidden">

              <button
                disabled
                className="flex w-full items-center justify-between px-6 py-5 hover:bg-gray-50"
              >
                <span className="font-medium">
                  Edit Profile
                </span>

                <ChevronRight size={18} />
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between border-t px-6 py-5 text-red-600 hover:bg-red-50"
              >
                <span className="flex items-center gap-3">

                  <LogOut size={18} />

                  Logout

                </span>

                <ChevronRight size={18} />
              </button>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}