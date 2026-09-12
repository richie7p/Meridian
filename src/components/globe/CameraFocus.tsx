import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import {
  CAMERA_FOCUS_DISTANCE,
  CAMERA_HOME_DISTANCE,
  easeOutCubic,
  INITIAL_CAMERA,
  latLngToPosition,
  lerpAngle,
} from "@/lib/geo";
import { LOCATIONS_BY_ID } from "@/lib/locations";
import { useGlobeStore } from "@/lib/store";

const _from = new THREE.Spherical();
const _work = new THREE.Spherical();
const _vec = new THREE.Vector3();

export function CameraFocus() {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as OrbitControls | null;
  const flyTo = useGlobeStore((s) => s.flyTo);
  const reducedMotion = useGlobeStore((s) => s.reducedMotion);
  const setFlying = useGlobeStore((s) => s.setFlying);
  const boot = useRef(true);
  const anim = useRef({
    active: false,
    t: 0,
    duration: 1.2,
    fromTheta: 0,
    fromPhi: 0,
    fromR: 0,
    toTheta: 0,
    toPhi: 0,
    toR: 0,
  });

  useEffect(() => {
    if (boot.current) {
      boot.current = false;
      return;
    }
    if (!controls) return;

    _from.setFromVector3(camera.position);

    if (flyTo.to === "home") {
      _vec.set(...INITIAL_CAMERA);
      _work.setFromVector3(_vec);
    } else if (flyTo.to === "relax") {
      _work.copy(_from);
      _work.radius = CAMERA_HOME_DISTANCE;
    } else {
      const loc = LOCATIONS_BY_ID[flyTo.to];
      if (!loc) return;
      _vec.set(...latLngToPosition(loc.lat, loc.lng, CAMERA_FOCUS_DISTANCE));
      _work.setFromVector3(_vec);
    }

    if (reducedMotion) {
      camera.position.setFromSpherical(_work);
      camera.lookAt(0, 0, 0);
      controls.target.set(0, 0, 0);
      controls.update();
      return;
    }

    anim.current = {
      active: true,
      t: 0,
      duration: flyTo.to === "relax" ? 0.85 : 1.2,
      fromTheta: _from.theta,
      fromPhi: _from.phi,
      fromR: _from.radius,
      toTheta: _work.theta,
      toPhi: _work.phi,
      toR: _work.radius,
    };
    controls.enabled = false;
    setFlying(true);
  }, [flyTo.nonce, flyTo.to, camera, controls, reducedMotion, setFlying]);

  useFrame((_, delta) => {
    const a = anim.current;
    if (!a.active || !controls) return;
    const dt = Math.min(delta, 0.1);
    a.t += dt / a.duration;
    const t = easeOutCubic(Math.min(1, a.t));
    const theta = lerpAngle(a.fromTheta, a.toTheta, t);
    const phi = a.fromPhi + (a.toPhi - a.fromPhi) * t;
    const radius = a.fromR + (a.toR - a.fromR) * t;
    _work.set(radius, phi, theta);
    camera.position.setFromSpherical(_work);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
    if (t >= 1) {
      a.active = false;
      controls.enabled = true;
      setFlying(false);
    }
  });

  return null;
}
