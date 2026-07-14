"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCustomToken,
} from "firebase/auth";

import { auth, authReady } from "../../lib/firebase";
import { studentApi } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

import LoginPanel from "./LoginPanel";
import ProfileForm from "./ProfileForm";

const REQUIRED_FIELDS = [
  "phone_number",
  "gender",
  "institution",
];

function studentNeedsProfile(student) {
  return REQUIRED_FIELDS.some((field) => !student?.[field]);
}

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const { setStudent } = useAuth();

  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    surname: "",
    phone_number: "",
    gender: "",
    institution: "",
  });

  function finishLogin(student) {
    setStudent(student);

    if (studentNeedsProfile(student)) {
      setForm((prev) => ({
        ...prev,
        first_name: student.first_name || "",
        surname: student.surname || "",
      }));

      setStep("profile");
      return;
    }

    router.replace(redirect);
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading("google");

    try {
      await authReady;

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const response = await studentApi.authGoogle({
        idToken,
      });

      if (response.firebaseToken) {
        await signInWithCustomToken(
          auth,
          response.firebaseToken
        );
      }

      finishLogin(response.student);
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign in failed.");
    } finally {
      setLoading("");
    }
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();

    setLoading("profile");
    setError("");

    try {
      const token = await auth.currentUser.getIdToken();

      const updated = await studentApi.updateMe(
        form,
        token
      );

      setStudent(updated);

      router.replace(redirect);
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save profile.");
    } finally {
      setLoading("");
    }
  }

  if (step === "login") {
    return (
      <LoginPanel
        loading={loading === "google"}
        error={error}
        onGoogleLogin={handleGoogleLogin}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 p-5">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <ProfileForm
          form={form}
          onChange={setForm}
          onSubmit={handleProfileSubmit}
          loading={loading === "profile"}
          onBack={() => setStep("login")}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}