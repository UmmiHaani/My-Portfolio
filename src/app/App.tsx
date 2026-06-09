import React from "react";
import { Hero } from "./components/Hero";
import { Re4AmmoHud } from "./components/Re4AmmoHud";
import { Re4TitleScreen } from "./components/Re4TitleScreen";
import { SiteFooter } from "./components/SiteFooter";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] scroll-smooth">
      <Re4TitleScreen />
      <Hero />
      <SiteFooter />
      <Re4AmmoHud />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          className: "re4-toast",
          style: {
            background: "#0a0a0a",
            border: "1px solid #333",
            color: "#f0f0f0",
          },
        }}
      />
    </div>
  );
}