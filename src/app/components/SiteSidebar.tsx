import React, { useEffect, useState } from "react";
import { BookOpen, ExternalLink, FolderKanban, Github, Home, Instagram, Mail, Wrench, Youtube } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { playUiClickSound } from "../lib/re4Audio";
import { useTheme } from "../hooks/useTheme";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";

const PROFILE_IMAGE = {
  light: "/profile/light-mode/avatar.jpg",
  dark: "/profile/dark-mode/avatar.jpg",
} as const;
const CONTACT_EMAIL = "shahrulhaani@gmail.com";
const GITHUB_URL = "https://github.com/UmmiHaani";
const INSTAGRAM_URL = "https://www.instagram.com/official_haani_shahrul/";
const YOUTUBE_URL = "https://www.youtube.com/@ItsSleppyFox";

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Projects", icon: FolderKanban, path: "/projects" },
  { label: "Blogs", icon: BookOpen, path: "/blogs" },
  { label: "Tools", icon: Wrench, path: "/tools" },
] as const;

const SOCIAL_ITEMS = [
  { label: "Instagram", icon: Instagram, href: INSTAGRAM_URL, external: true },
  { label: "GitHub", icon: Github, href: GITHUB_URL, external: true },
  { label: "Email", icon: Mail, href: `mailto:${CONTACT_EMAIL}`, external: false },
  { label: "YouTube", icon: Youtube, href: YOUTUBE_URL, external: true },
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

function SidebarAvailability() {
  return (
    <div className="mt-4 border-t border-sidebar-border px-2 pt-3">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="sidebar-availability__link group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        aria-label="Reach out via email"
        onClick={() => playUiClickSound()}
      >
        <div className="sidebar-availability__viewport h-6 overflow-hidden">
          <div className="sidebar-availability__stack flex flex-col transition-transform duration-500 ease-out">
            <span className="flex h-6 items-center gap-2 text-[11px] font-normal uppercase tracking-[0.18em] text-sidebar-foreground/50">
              <span className="sidebar-availability__dot shrink-0" aria-hidden />
              <span className="border-b border-dashed border-sidebar-foreground/35 pb-px">
                Available for work
              </span>
            </span>
            <span className="flex h-6 items-center gap-2 text-[11px] font-normal uppercase tracking-[0.18em] text-sidebar-foreground/50">
              <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              Reach out
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

function SidebarProfile() {
  const { theme } = useTheme();
  const profileSrc = PROFILE_IMAGE[theme];

  return (
    <div className="flex min-w-0 items-center gap-3 px-2">
      <Avatar className="size-10 shrink-0 border border-sidebar-border">
        <AvatarImage
          src={profileSrc}
          alt="Haani Shahrul"
          className="size-full object-cover object-[center_22%]"
        />
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
    <SidebarGroup className="px-4 pt-3">
      <SidebarGroupLabel className="mb-1 h-auto px-0 py-0 text-[10px] font-normal uppercase tracking-[0.18em] text-sidebar-foreground/50">
        Navigation
      </SidebarGroupLabel>
      <SidebarGroupContent className="px-0">
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

function SiteSidebarSocial() {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = () => {
    playUiClickSound();
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup className="mt-16 px-4 pt-0">
      <div className="mb-3 border-t border-sidebar-border" aria-hidden />
      <SidebarGroupLabel className="mb-1 h-auto px-0 py-0 text-[10px] font-normal uppercase tracking-[0.18em] text-sidebar-foreground/50">
        Connect
      </SidebarGroupLabel>
      <SidebarGroupContent className="px-0">
        <SidebarMenu>
          {SOCIAL_ITEMS.map(({ label, icon: Icon, href, external }) => (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton
                asChild
                className="h-10 text-[15px] tracking-[0.02em]"
              >
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={handleClick}
                >
                  <Icon strokeWidth={1.75} />
                  <span>{label}</span>
                  {external ? (
                    <ExternalLink
                      className="ml-auto h-3.5 w-3.5 shrink-0 opacity-50"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  ) : null}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function MobileSidebarTrigger() {
  const { openMobile } = useSidebar();
  if (openMobile) return null;

  return (
    <SidebarTrigger className="fixed left-4 top-4 z-[140] size-10 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-md hover:bg-sidebar-accent md:hidden" />
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
          <SidebarAvailability />
        </SidebarHeader>

        <SidebarContent>
          <SiteSidebarNav />
          <SiteSidebarSocial />
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-4">
          <ThemeToggle variant="sidebar" />
        </SidebarFooter>
      </Sidebar>

      <MobileSidebarTrigger />
    </>
  );
}
