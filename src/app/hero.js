import React from "react";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function Hero() {
  return (
    <main className="bg-gradient-to-b from-[#0f172a] via-[#722782] to-[#000000] min-h-screen flex items-center justify-center">
      {/* Desktop: Masked effect */}
      <div className="hidden md:block w-full">
        <MaskContainer
          revealText={
            <div className="text-white text-6xl font-extrabold">
              I am an <span className="text-fuchsia-400">exceptional</span>
              <br /> developer & designer
            </div>
          }
          size={20}
          revealSize={300}
          className="bg-black text-white"
        >
          Because of unhandled exceptions!
          <br />
          Half Developer, Half Designer
        </MaskContainer>
      </div>

      {/* Mobile: Just plain text */}
      <div className="block md:hidden text-center px-6">
        <h1 className="text-white text-4xl font-extrabold leading-tight">
          I am an <span className="text-fuchsia-400">exceptional</span>
          <br /> developer & designer
        </h1>
        <p className="text-gray-300 text-lg mt-4">
          Because of unhandled exceptions!
          <br />
          Half Developer, Half Designer
        </p>
      </div>
    </main>
  );
}
