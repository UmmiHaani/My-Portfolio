import React from "react";
import { Route, Routes } from "react-router";
import { Re4AmmoHud } from "./components/Re4AmmoHud";
import { SiteSidebar } from "./components/SiteSidebar";
import { ThemeProvider } from "./components/ThemeProvider";
import { useTheme } from "./hooks/useTheme";
import { ExperiencePage } from "./pages/ExperiencePage";
import { HomePage } from "./pages/HomePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";

function AppContent() {
  const { theme } = useTheme();

  return (
    <SidebarProvider
      className="min-h-screen bg-[var(--pf-bg)] transition-colors duration-200"
      style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
    >
      <SiteSidebar />
      <SidebarInset className="scroll-smooth bg-[var(--pf-bg)] transition-colors duration-200">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<PlaceholderPage />} />
          <Route path="/blogs" element={<PlaceholderPage />} />
          <Route path="/contact" element={<PlaceholderPage />} />
          <Route path="/tools" element={<PlaceholderPage />} />
        </Routes>
      </SidebarInset>
      <Re4AmmoHud />
      <Toaster
        theme={theme}
        position="bottom-right"
        toastOptions={{
          className: "re4-toast",
        }}
      />
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
