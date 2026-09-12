import { useEffect, useState, type ComponentType } from "react";
import { useGlobeStore } from "@/lib/store";

export function GlobeView() {
  const [Scene, setScene] = useState<ComponentType | null>(null);
  const setReducedMotion = useGlobeStore((s) => s.setReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [setReducedMotion]);

  useEffect(() => {
    let live = true;
    void import("./GlobeCanvas").then((mod) => {
      if (live) setScene(() => mod.GlobeCanvas);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!Scene) {
    return (
      <div className="absolute inset-0 bg-bg" aria-hidden>
        <div className="flex h-full items-center justify-center">
          <p className="font-display text-3xl tracking-tight text-fg">
            Meridian
          </p>
        </div>
      </div>
    );
  }

  return <Scene />;
}
