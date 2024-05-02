"use client";

import { InlineWidget } from "react-calendly";

import PricingNavbar from "@/components/pricing-navbar";

const Book = () => {
  return (
    <>
      <div className="flex flex-col   w-full  h-screen bg-black/[0.96]  bg-grid-white/[0.02]   ">
        <PricingNavbar />
        <div
          className="text-4xl pb-5 md:text-6xl text-center 
        bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
        >
          Book a meeting
        </div>

        <InlineWidget url="https://calendly.com/beqamerebashvili26/consultation" />
      </div>
    </>
  );
};

export default Book;
