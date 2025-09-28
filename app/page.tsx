"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      <Hero/>
      <Features/>
      <Pricing/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </main>
  );
}
