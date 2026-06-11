import { Hero } from "../components/Hero";
import { Re4TitleScreen } from "../components/Re4TitleScreen";
import { SiteFooter } from "../components/SiteFooter";

export function HomePage() {
  return (
    <>
      <Re4TitleScreen />
      <Hero />
      <SiteFooter />
    </>
  );
}
