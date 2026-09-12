import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToPosition } from "@/lib/geo";
import { LOCATIONS, type Location } from "@/lib/locations";
import { useGlobeStore } from "@/lib/store";

const _up = new THREE.Vector3(0, 1, 0);
const _dir = new THREE.Vector3();

function Marker({ loc }: { loc: Location }) {
  const halo = useRef<THREE.Mesh>(null);
  const selectedId = useGlobeStore((s) => s.selectedId);
  const hoveredId = useGlobeStore((s) => s.hoveredId);
  const select = useGlobeStore((s) => s.select);
  const hover = useGlobeStore((s) => s.hover);
  const reducedMotion = useGlobeStore((s) => s.reducedMotion);

  const active = selectedId === loc.id;
  const hovered = hoveredId === loc.id;
  const lit = active || hovered;

  const { position, quaternion } = useMemo(() => {
    const [x, y, z] = latLngToPosition(loc.lat, loc.lng, 1.018);
    const quaternion = new THREE.Quaternion();
    _dir.set(x, y, z).normalize();
    quaternion.setFromUnitVectors(_up, _dir);
    return { position: [x, y, z] as [number, number, number], quaternion };
  }, [loc.lat, loc.lng]);

  useFrame(({ clock }) => {
    if (!halo.current) return;
    const pulse = reducedMotion
      ? 1
      : 1 + Math.sin(clock.elapsedTime * 2.1 + loc.lat) * (active ? 0.22 : 0.12);
    const base = active ? 1.35 : hovered ? 1.15 : 1;
    halo.current.scale.setScalar(base * pulse);
  });

  return (
    <group position={position} quaternion={quaternion}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          select(loc.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(loc.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hover(null);
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[0.058, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.016 : 0.011, 16, 16]} />
        <meshBasicMaterial
          color={active ? "#e8eef4" : "#b7d0e0"}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial
          color={active ? "#c5dde8" : "#8eb4c8"}
          transparent
          opacity={lit ? 0.45 : 0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      {active ? (
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.2, 8]} />
          <meshBasicMaterial
            color="#9ec4d8"
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ) : null}
      {lit ? (
        <Billboard position={[0, 0.02, 0]} follow>
          <mesh>
            <ringGeometry args={[0.032, 0.04, 40]} />
            <meshBasicMaterial
              color="#d5e6f0"
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      ) : null}
      {lit ? (
        <Html
          position={[0, 0.09, 0]}
          center
          distanceFactor={2.6}
          style={{ pointerEvents: "none" }}
          zIndexRange={[20, 0]}
        >
          <div className="rounded-sm border border-border bg-surface px-2 py-1">
            <p className="font-display text-sm leading-snug text-fg whitespace-nowrap">
              {loc.nameZh}
            </p>
            <p className="text-xs leading-snug text-muted whitespace-nowrap">
              {loc.nameEn}
            </p>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

export function Markers() {
  return (
    <group>
      {LOCATIONS.map((loc) => (
        <Marker key={loc.id} loc={loc} />
      ))}
    </group>
  );
}
