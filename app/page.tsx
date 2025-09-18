// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      {!isSignedIn && (
        <>
          <h1 className="text-2xl font-bold">Welcome to SaveSmart</h1>
          <SignInButton>
            <button className="bg-blue-500 text-white rounded-full px-6 py-3 cursor-pointer">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton>
            <button className="bg-purple-600 text-white rounded-full px-6 py-3 ">
              Sign Up
            </button>
          </SignUpButton>
        </>
      )}
    </main>
  );
}
