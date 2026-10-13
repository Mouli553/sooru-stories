import React from "react";
import HeroSection from "@/components/home/HeroSection";
import RasamChronicles from "@/components/home/RasamChronicles";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import StorySection from "@/components/home/StorySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BookingSection from "@/components/home/BookingSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RasamChronicles />
      <ShowcaseSection />
      <StorySection />
      <TestimonialsSection />
      <BookingSection />
    </>
  );
}