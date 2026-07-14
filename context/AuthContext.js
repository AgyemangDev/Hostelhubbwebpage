"use client";

// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, authReady } from "../lib/firebase";

const STORAGE_KEY = "hostelhubb_student";
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [student, setStudentState] = useState(() => {
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Keep student info in sync with sessionStorage so a refresh doesn't
  // lose the profile returned by the API.
  const setStudent = (nextStudent) => {
    setStudentState(nextStudent);
    try {
      if (nextStudent) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextStudent));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  };

  useEffect(() => {
    let unsubscribe = () => {};
    authReady.then(() => {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        setFirebaseUser(user);
        setInitializing(false);
        if (!user) setStudent(null);
      });
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setStudent(null);
  };

  const value = useMemo(
    () => ({
      student,
      setStudent,
      firebaseUser,
      isAuthenticated: Boolean(firebaseUser && student),
      initializing,
      logout,
    }),
    [student, firebaseUser, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}