import React, { useEffect, useState } from "react";
import { BookOpen, Briefcase, Home, Wrench } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";

/** Drop your photo at `public/profile/avatar.jpg` or update this path. */
const PROFILE_IMAGE_SRC = "/profile/avatar.jpg";

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Experience", icon: Briefcase, path: "/experience" },
  { label: "Blogs", icon: BookOpen, path: "/blogs" },
  { label: "Tools", icon: Wrench, path: "/tools" },
] as const;

const ROLE_PHRASES = [
  ["AI", "engineer"],
  ["SOFTWARE", "ENGINEER"],
] as const;

function TypewriterRole({
  phrases,
}: {
  phrases: readonly (readonly string[])[];
}) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const ariaLabel = phrases.map((words) => words.join(" ")).join(", ");

  useEffect(() => {
    let phraseIndex = 0;
    let wordIndex = 0;
    let charIndex = 0;
    let current = "";
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const words = phrases[phraseIndex];
      const word = words[wordIndex];

      if (!deleting) {
        if (charIndex < word.length) {
          current += word[charIndex];
          charIndex += 1;
          setText(current);
          timeoutId = setTimeout(tick, 90);
          return;
        }

        if (wordIndex < words.length - 1) {
          current += " ";
          wordIndex += 1;
          charIndex = 0;
          setText(current);
          timeoutId = setTimeout(tick, 280);
          return;
        }

        timeoutId = setTimeout(() => {
          deleting = true;
          tick();
        }, 2200);
        return;
      }

      if (current.length > 0) {
        current = current.slice(0, -1);
        setText(current);
        timeoutId = setTimeout(tick, 45);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      wordIndex = 0;
      charIndex = 0;
      timeoutId = setTimeout(tick, 500);
    };

    timeoutId = setTimeout(tick, 400);

    return () => clearTimeout(timeoutId);
  }, [phrases]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((visible) => !visible);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <span aria-label={ariaLabel} className="inline-flex items-center">
      <span>{text}</span>
      <span
        aria-hidden
        className={[
          "ml-0.5 inline-block h-[0.85em] w-[1px] bg-sidebar-foreground/50 transition-opacity duration-100",
          showCursor ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </span>
  );
}

function SidebarProfile() {
  return (
    <div className="flex min-w-0 items-start gap-3 px-1">
      <Avatar className="mt-0.5 h-9 w-9 border border-sidebar-border">
        <AvatarImage src={PROFILE_IMAGE_SRC} alt="Haani Shahrul" />
        <AvatarFallback className="bg-sidebar-accent text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70">
          HS
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-sidebar-foreground">
          Haani Shahrul
        </p>
        <p className="mt-1 text-xs font-normal uppercase tracking-[0.1em] text-sidebar-foreground/60">
          <TypewriterRole phrases={ROLE_PHRASES} />
        </p>
      </div>
    </div>
  );
}

function SiteSidebarNav() {
  const { isMobile, setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path;

  const handleSelect = (path: string) => {
    navigate(path);
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup className="pl-4">
      <SidebarGroupContent>
        <SidebarMenu>
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const active = isActive(path);

            return (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton
                  type="button"
                  isActive={active}
                  onClick={() => handleSelect(path)}
                  aria-current={active ? "page" : undefined}
                  className="h-10 text-[15px] tracking-[0.02em]"
                >
                  <Icon strokeWidth={1.75} />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function SiteSidebar() {
  return (
    <>
      <Sidebar
        collapsible="offcanvas"
        className="re4-save-ui z-40 border-sidebar-border"
      >
        <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
          <SidebarProfile />
        </SidebarHeader>

        <SidebarContent>
          <SiteSidebarNav />
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-4">
          <ThemeToggle variant="sidebar" />
        </SidebarFooter>
      </Sidebar>

      <SidebarTrigger className="fixed left-4 top-4 z-[140] size-10 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-md hover:bg-sidebar-accent md:hidden" />
    </>
  );
}
