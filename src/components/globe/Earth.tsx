import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useGlobeStore } from "@/lib/store";

const SUN: [number, number, number] = [4.2, 1.6, 2.6];
const NORMAL_SCALE = new THREE.Vector2(0.55, 0.55);
const SPECULAR = new THREE.Color("#7ea8c4");
const EMISSIVE = new THREE.Color("#e8a878");
const BLACK = new THREE.Color("#000000");
const ATMOS = new THREE.Color("#6ea4d4");

export function Earth() {
  const reducedMotion = useGlobeStore((s) => s.reducedMotion);
  const setAssetsReady = useGlobeStore((s) => s.setAssetsReady);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const day = useTexture("/textures/earth-day.jpg");
  const night = useTexture("/textures/earth-night.jpg");
  const spec = useTexture("/textures/earth-specular.jpg");
  const normal = useTexture("/textures/earth-normal.jpg");
  const clouds = useTexture("/textures/earth-clouds.png");

  useEffect(() => {
    day.colorSpace = THREE.SRGBColorSpace;
    night.colorSpace = THREE.SRGBColorSpace;
    clouds.colorSpace = THREE.SRGBColorSpace;
    spec.colorSpace = THREE.NoColorSpace;
    normal.colorSpace = THREE.NoColorSpace;
    for (const tex of [day, night, spec, normal, clouds]) {
      tex.anisotropy = 8;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
    }
    setAssetsReady(true);
  }, [day, night, spec, normal, clouds, setAssetsReady]);

  const sphere = useMemo(() => new THREE.SphereGeometry(1, 64, 64), []);
  useEffect(() => () => sphere.dispose(), [sphere]);

  const atmosphere = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float uPower;
          uniform float uIntensity;
          uniform vec3 uColor;
          void main() {
            float fresnel = pow(uIntensity - dot(vNormal, vec3(0.0, 0.0, 1.0)), uPower);
            gl_FragColor = vec4(uColor * fresnel, 1.0);
          }
        `,
        uniforms: {
          uPower: { value: 2.6 },
          uIntensity: { value: 0.64 },
          uColor: { value: ATMOS },
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  const limb = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float fresnel = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.4);
            gl_FragColor = vec4(vec3(0.45, 0.72, 1.0) * fresnel, 1.0);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      atmosphere.dispose();
      limb.dispose();
    },
    [atmosphere, limb],
  );

  useFrame((_, delta) => {
    if (reducedMotion || !cloudsRef.current) return;
    const d = Math.min(delta, 0.1);
    cloudsRef.current.rotation.y += d * 0.012;
  });

  return (
    <group>
      <mesh geometry={sphere}>
        <meshPhongMaterial
          map={day}
          normalMap={normal}
          normalScale={NORMAL_SCALE}
          specularMap={spec}
          specular={SPECULAR}
          shininess={16}
          emissiveMap={night}
          emissive={EMISSIVE}
          emissiveIntensity={1.45}
        />
      </mesh>
      <mesh ref={cloudsRef} geometry={sphere} scale={1.012}>
        <meshPhongMaterial
          map={clouds}
          transparent
          opacity={0.42}
          depthWrite={false}
          shininess={0}
          specular={BLACK}
        />
      </mesh>
      <mesh geometry={sphere} scale={1.035} material={limb} />
      <mesh geometry={sphere} scale={1.12} material={atmosphere} />
      <directionalLight position={SUN} intensity={2.2} color="#fff1dc" />
      <hemisphereLight args={["#b7cbe0", "#07090d", 0.32]} />
      <ambientLight intensity={0.06} color="#9db4c8" />
    </group>
  );
}
