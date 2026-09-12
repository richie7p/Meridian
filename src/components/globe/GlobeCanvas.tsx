import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { INITIAL_CAMERA } from "@/lib/geo";
import { useGlobeStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CameraFocus } from "./CameraFocus";
import { Earth } from "./Earth";
import { Markers } from "./Markers";
import { Starfield } from "./Starfield";

function LoaderOverlay() {
  const ready = useGlobeStore((s) => s.assetsReady);
  const setAssetsReady = useGlobeStore((s) => s.setAssetsReady);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setAssetsReady(true), 6000);
    return () => window.clearTimeout(t);
  }, [setAssetsReady]);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setMounted(false), 450);
    return () => window.clearTimeout(t);
  }, [ready]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "loader-overlay absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-(--motion-slow) ease-(--ease-smooth-out)",
        ready ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      aria-hidden={ready}
    >
      <div className="flex flex-col items-center gap-5">
        <p className="font-display text-3xl tracking-tight text-fg">Meridian</p>
        <div className="h-px w-32 overflow-hidden bg-border">
          <div className="loader-bar h-full bg-accent" />
        </div>
        <p className="text-xs tracking-wide text-muted">載入地球儀</p>
      </div>
    </div>
  );
}

function Scene() {
  const autoRotateEnabled = useGlobeStore((s) => s.autoRotateEnabled);
  const interacting = useGlobeStore((s) => s.interacting);
  const selectedId = useGlobeStore((s) => s.selectedId);
  const isFlying = useGlobeStore((s) => s.isFlying);
  const reducedMotion = useGlobeStore((s) => s.reducedMotion);
  const setInteracting = useGlobeStore((s) => s.setInteracting);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const autoRotate =
    autoRotateEnabled &&
    !interacting &&
    !selectedId &&
    !isFlying &&
    !reducedMotion;

  return (
    <>
      <color attach="background" args={["#07090d"]} />
      <Starfield />
      <Earth />
      <Markers />
      <CameraFocus />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        minDistance={1.55}
        maxDistance={4.2}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI - 0.35}
        autoRotate={autoRotate}
        autoRotateSpeed={0.32}
        onStart={() => {
          if (idleTimer.current) clearTimeout(idleTimer.current);
          setInteracting(true);
        }}
        onEnd={() => {
          if (idleTimer.current) clearTimeout(idleTimer.current);
          idleTimer.current = setTimeout(() => setInteracting(false), 4000);
        }}
      />
    </>
  );
}

export function GlobeCanvas() {
  const interacting = useGlobeStore((s) => s.interacting);

  return (
    <div
      className={cn(
        "absolute inset-0 touch-none md:left-80 max-md:bottom-36",
        interacting ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      <Canvas
        camera={{
          position: INITIAL_CAMERA,
          fov: 42,
          near: 0.1,
          far: 160,
        }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#07090d");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <LoaderOverlay />
    </div>
  );
}
