import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, _ as ShaderMaterial, b as Vector2, c as useThree, d as BufferGeometry, f as ClampToEdgeWrapping, g as SRGBColorSpace, h as RepeatWrapping, i as Html, m as Quaternion, n as useTexture, o as Canvas, p as Color, r as Billboard, s as useFrame, t as OrbitControls, u as BufferAttribute, v as SphereGeometry, x as Vector3, y as Spherical } from "../_libs/@react-three/drei+[...].mjs";
import { a as useGlobeStore, c as INITIAL_CAMERA, d as lerpAngle, i as cn, l as easeOutCubic, n as LOCATIONS, o as CAMERA_FOCUS_DISTANCE, r as LOCATIONS_BY_ID, s as CAMERA_HOME_DISTANCE, u as latLngToPosition } from "./routes-lE_nf43i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GlobeCanvas-w4kuJde3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _from = new Spherical();
var _work = new Spherical();
var _vec = new Vector3();
function CameraFocus() {
	const camera = useThree((s) => s.camera);
	const controls = useThree((s) => s.controls);
	const flyTo = useGlobeStore((s) => s.flyTo);
	const reducedMotion = useGlobeStore((s) => s.reducedMotion);
	const setFlying = useGlobeStore((s) => s.setFlying);
	const boot = (0, import_react.useRef)(true);
	const anim = (0, import_react.useRef)({
		active: false,
		t: 0,
		duration: 1.2,
		fromTheta: 0,
		fromPhi: 0,
		fromR: 0,
		toTheta: 0,
		toPhi: 0,
		toR: 0
	});
	(0, import_react.useEffect)(() => {
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
			duration: flyTo.to === "relax" ? .85 : 1.2,
			fromTheta: _from.theta,
			fromPhi: _from.phi,
			fromR: _from.radius,
			toTheta: _work.theta,
			toPhi: _work.phi,
			toR: _work.radius
		};
		controls.enabled = false;
		setFlying(true);
	}, [
		flyTo.nonce,
		flyTo.to,
		camera,
		controls,
		reducedMotion,
		setFlying
	]);
	useFrame((_, delta) => {
		const a = anim.current;
		if (!a.active || !controls) return;
		a.t += Math.min(delta, .1) / a.duration;
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
var SUN = [
	4.2,
	1.6,
	2.6
];
var NORMAL_SCALE = new Vector2(.55, .55);
var SPECULAR = new Color("#7ea8c4");
var EMISSIVE = new Color("#e8a878");
var BLACK = new Color("#000000");
var ATMOS = new Color("#6ea4d4");
function Earth() {
	const reducedMotion = useGlobeStore((s) => s.reducedMotion);
	const setAssetsReady = useGlobeStore((s) => s.setAssetsReady);
	const cloudsRef = (0, import_react.useRef)(null);
	const day = useTexture("/textures/earth-day.jpg");
	const night = useTexture("/textures/earth-night.jpg");
	const spec = useTexture("/textures/earth-specular.jpg");
	const normal = useTexture("/textures/earth-normal.jpg");
	const clouds = useTexture("/textures/earth-clouds.png");
	(0, import_react.useEffect)(() => {
		day.colorSpace = SRGBColorSpace;
		night.colorSpace = SRGBColorSpace;
		clouds.colorSpace = SRGBColorSpace;
		spec.colorSpace = "";
		normal.colorSpace = "";
		for (const tex of [
			day,
			night,
			spec,
			normal,
			clouds
		]) {
			tex.anisotropy = 8;
			tex.wrapS = RepeatWrapping;
			tex.wrapT = ClampToEdgeWrapping;
			tex.needsUpdate = true;
		}
		setAssetsReady(true);
	}, [
		day,
		night,
		spec,
		normal,
		clouds,
		setAssetsReady
	]);
	const sphere = (0, import_react.useMemo)(() => new SphereGeometry(1, 64, 64), []);
	(0, import_react.useEffect)(() => () => sphere.dispose(), [sphere]);
	const atmosphere = (0, import_react.useMemo)(() => new ShaderMaterial({
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
			uIntensity: { value: .64 },
			uColor: { value: ATMOS }
		},
		blending: 2,
		side: 1,
		transparent: true,
		depthWrite: false,
		toneMapped: false
	}), []);
	const limb = (0, import_react.useMemo)(() => new ShaderMaterial({
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
		blending: 2,
		side: 0,
		transparent: true,
		depthWrite: false,
		toneMapped: false
	}), []);
	(0, import_react.useEffect)(() => () => {
		atmosphere.dispose();
		limb.dispose();
	}, [atmosphere, limb]);
	useFrame((_, delta) => {
		if (reducedMotion || !cloudsRef.current) return;
		const d = Math.min(delta, .1);
		cloudsRef.current.rotation.y += d * .012;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: sphere,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
				map: day,
				normalMap: normal,
				normalScale: NORMAL_SCALE,
				specularMap: spec,
				specular: SPECULAR,
				shininess: 16,
				emissiveMap: night,
				emissive: EMISSIVE,
				emissiveIntensity: 1.45
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: cloudsRef,
			geometry: sphere,
			scale: 1.012,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
				map: clouds,
				transparent: true,
				opacity: .42,
				depthWrite: false,
				shininess: 0,
				specular: BLACK
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: sphere,
			scale: 1.035,
			material: limb
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: sphere,
			scale: 1.12,
			material: atmosphere
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: SUN,
			intensity: 2.2,
			color: "#fff1dc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#b7cbe0",
			"#07090d",
			.32
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .06,
			color: "#9db4c8"
		})
	] });
}
var _up = new Vector3(0, 1, 0);
var _dir = new Vector3();
function Marker({ loc }) {
	const halo = (0, import_react.useRef)(null);
	const selectedId = useGlobeStore((s) => s.selectedId);
	const hoveredId = useGlobeStore((s) => s.hoveredId);
	const select = useGlobeStore((s) => s.select);
	const hover = useGlobeStore((s) => s.hover);
	const reducedMotion = useGlobeStore((s) => s.reducedMotion);
	const active = selectedId === loc.id;
	const hovered = hoveredId === loc.id;
	const lit = active || hovered;
	const { position, quaternion } = (0, import_react.useMemo)(() => {
		const [x, y, z] = latLngToPosition(loc.lat, loc.lng, 1.018);
		const quaternion = new Quaternion();
		_dir.set(x, y, z).normalize();
		quaternion.setFromUnitVectors(_up, _dir);
		return {
			position: [
				x,
				y,
				z
			],
			quaternion
		};
	}, [loc.lat, loc.lng]);
	useFrame(({ clock }) => {
		if (!halo.current) return;
		const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 2.1 + loc.lat) * (active ? .22 : .12);
		const base = active ? 1.35 : hovered ? 1.15 : 1;
		halo.current.scale.setScalar(base * pulse);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		quaternion,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				onClick: (e) => {
					e.stopPropagation();
					select(loc.id);
				},
				onPointerOver: (e) => {
					e.stopPropagation();
					hover(loc.id);
					document.body.style.cursor = "pointer";
				},
				onPointerOut: () => {
					hover(null);
					document.body.style.cursor = "";
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.058,
					12,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					transparent: true,
					opacity: 0,
					depthWrite: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				active ? .016 : .011,
				16,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: active ? "#e8eef4" : "#b7d0e0",
				toneMapped: false
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: halo,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.028,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: active ? "#c5dde8" : "#8eb4c8",
					transparent: true,
					opacity: lit ? .45 : .28,
					depthWrite: false,
					blending: 2,
					toneMapped: false
				})]
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.11,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.0035,
					.0035,
					.2,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#9ec4d8",
					transparent: true,
					opacity: .4,
					depthWrite: false,
					blending: 2,
					toneMapped: false
				})]
			}) : null,
			lit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Billboard, {
				position: [
					0,
					.02,
					0
				],
				follow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.032,
					.04,
					40
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#d5e6f0",
					transparent: true,
					opacity: .85,
					side: 2,
					depthWrite: false,
					toneMapped: false
				})] })
			}) : null,
			lit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					0,
					.09,
					0
				],
				center: true,
				distanceFactor: 2.6,
				style: { pointerEvents: "none" },
				zIndexRange: [20, 0],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-border bg-surface px-2 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm leading-snug text-fg whitespace-nowrap",
						children: loc.nameZh
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug text-muted whitespace-nowrap",
						children: loc.nameEn
					})]
				})
			}) : null
		]
	});
}
function Markers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: LOCATIONS.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, { loc }, loc.id)) });
}
var COUNT = 2200;
function Starfield() {
	const geometry = (0, import_react.useMemo)(() => {
		const positions = new Float32Array(COUNT * 3);
		for (let i = 0; i < COUNT; i++) {
			const r = 28 + Math.random() * 70;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);
		}
		const geom = new BufferGeometry();
		geom.setAttribute("position", new BufferAttribute(positions, 3));
		return geom;
	}, []);
	(0, import_react.useEffect)(() => () => geometry.dispose(), [geometry]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		geometry,
		frustumCulled: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#d5dee8",
			size: .08,
			sizeAttenuation: true,
			transparent: true,
			opacity: .85,
			depthWrite: false,
			toneMapped: false
		})
	});
}
function LoaderOverlay() {
	const ready = useGlobeStore((s) => s.assetsReady);
	const setAssetsReady = useGlobeStore((s) => s.setAssetsReady);
	const [mounted, setMounted] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => setAssetsReady(true), 6e3);
		return () => window.clearTimeout(t);
	}, [setAssetsReady]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const t = window.setTimeout(() => setMounted(false), 450);
		return () => window.clearTimeout(t);
	}, [ready]);
	if (!mounted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("loader-overlay absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-(--motion-slow) ease-(--ease-smooth-out)", ready ? "pointer-events-none opacity-0" : "opacity-100"),
		"aria-hidden": ready,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl tracking-tight text-fg",
					children: "Meridian"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-px w-32 overflow-hidden bg-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-bar h-full bg-accent" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted",
					children: "載入地球儀"
				})
			]
		})
	});
}
function Scene() {
	const autoRotateEnabled = useGlobeStore((s) => s.autoRotateEnabled);
	const interacting = useGlobeStore((s) => s.interacting);
	const selectedId = useGlobeStore((s) => s.selectedId);
	const isFlying = useGlobeStore((s) => s.isFlying);
	const reducedMotion = useGlobeStore((s) => s.reducedMotion);
	const setInteracting = useGlobeStore((s) => s.setInteracting);
	const idleTimer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (idleTimer.current) clearTimeout(idleTimer.current);
		};
	}, []);
	const autoRotate = autoRotateEnabled && !interacting && !selectedId && !isFlying && !reducedMotion;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#07090d"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markers, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraFocus, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			makeDefault: true,
			enablePan: false,
			enableDamping: true,
			dampingFactor: .08,
			rotateSpeed: .55,
			zoomSpeed: .7,
			minDistance: 1.55,
			maxDistance: 4.2,
			minPolarAngle: .35,
			maxPolarAngle: Math.PI - .35,
			autoRotate,
			autoRotateSpeed: .32,
			onStart: () => {
				if (idleTimer.current) clearTimeout(idleTimer.current);
				setInteracting(true);
			},
			onEnd: () => {
				if (idleTimer.current) clearTimeout(idleTimer.current);
				idleTimer.current = setTimeout(() => setInteracting(false), 4e3);
			}
		})
	] });
}
function GlobeCanvas() {
	const interacting = useGlobeStore((s) => s.interacting);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("absolute inset-0 touch-none md:left-80 max-md:bottom-36", interacting ? "cursor-grabbing" : "cursor-grab"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			camera: {
				position: INITIAL_CAMERA,
				fov: 42,
				near: .1,
				far: 160
			},
			dpr: [1, 1.6],
			gl: {
				antialias: true,
				alpha: false,
				powerPreference: "high-performance"
			},
			onCreated: ({ gl }) => {
				gl.setClearColor("#07090d");
				gl.toneMapping = 4;
				gl.toneMappingExposure = 1.08;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderOverlay, {})]
	});
}
//#endregion
export { GlobeCanvas };
