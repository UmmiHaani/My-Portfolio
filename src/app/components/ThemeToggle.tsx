import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

type ThemeToggleProps = {
  variant?: "floating" | "sidebar";
};

export function ThemeToggle({ variant = "floating" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const isDark = theme === "dark";

  if (variant === "sidebar") {
    return (
      <div className="flex w-full items-center justify-between gap-3 rounded-md px-1 py-1">
        <Label
          htmlFor="dark-mode-toggle"
          className="cursor-pointer font-normal text-sidebar-foreground"
        >
          {isLight ? (
            <Moon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          ) : (
            <Sun className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          )}
          Dark mode
        </Label>
        <Switch
          id="dark-mode-toggle"
          checked={isDark}
          onCheckedChange={(checked) => {
            if (checked !== isDark) toggleTheme();
          }}
          aria-label={isLight ? "Turn dark mode on" : "Turn dark mode off"}
        />
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[150] size-10 rounded-full shadow-md"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      )}
    </Button>
  );
}
