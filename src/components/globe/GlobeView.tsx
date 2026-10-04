import { supportsWebGL2 } from "@/lib/webgl";
import { createClientOnlyFn } from "@tanstack/react-start";
import { SceneBoundary } from "./SceneBoundary";
import { useEffect, useState, type ComponentType } from "react";
import { useGlobeStore } from "@/lib/store";

const loadGlobe = createClientOnlyFn(() => import("./GlobeCanvas"));

export function GlobeView() {
  const [failed, setFailed] = useState(false);
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
    if (!supportsWebGL2()) { setFailed(true); return; }
    void loadGlobe().then((mod) => {
      if (live) setScene(() => mod.GlobeCanvas);
    }).catch(() => { if (live) setFailed(true); });
    return () => {
      live = false;
    };
  }, []);

  if (failed) return <p role="alert" className="absolute top-1/3 right-6 text-fg">地球儀載入失敗或瀏覽器不支援 WebGL，仍可從列表探索地標。<button onClick={() => window.location.reload()}>重新載入</button></p>;

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

  return <SceneBoundary><Scene /></SceneBoundary>;
}
