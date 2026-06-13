import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Re4AmmoHud } from "./components/Re4AmmoHud";
import { SiteSidebar } from "./components/SiteSidebar";
import { ThemeProvider } from "./components/ThemeProvider";
import { useTheme } from "./hooks/useTheme";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { BlogsPage } from "./pages/BlogsPage";
import { HomePage } from "./pages/HomePage";
import { ToolsPage } from "./pages/ToolsPage";
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
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<Navigate to="/projects" replace />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/two-pointer-pattern-notes" element={<Navigate to="/blogs/hash-map-two-sum" replace />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/tools" element={<ToolsPage />} />
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
