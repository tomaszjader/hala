import { assetUrl } from "@/assets";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#eddda8",
  background: "#293f2e",
  ink: "#ffffff",
  muted: "#f2eddd",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "poczatek",
    label: "Poznaj Tatry",
    poster: assetUrl("assets/world/scene-01-poster.png"),
    mobilePoster: assetUrl("assets/world/scene-01-mobile-poster.png"),
    clip: assetUrl("assets/world/scene-01.mp4"),
    mobileClip: assetUrl("assets/world/scene-01-mobile.mp4"),
    kicker: "ZAWÓD, KTÓRY MA KORZENIE",
    title: "Twoje miejsce jest tutaj.",
    body: "Zamień codzienny pośpiech na rytm gór. Poznaj życie pasterza pośród tatrzańskich hal.",
    scroll: 2.8,
    linger: 0.08,
    objectPosition: "62% center",
    mobileObjectPosition: "50% center"
  }
];
