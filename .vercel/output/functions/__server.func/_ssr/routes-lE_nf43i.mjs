import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as ChevronDown, i as Compass, r as RotateCw, t as X } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-lE_nf43i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var CAMERA_HOME_DISTANCE = 2.72;
var CAMERA_FOCUS_DISTANCE = 2.14;
/** Equirectangular sphere mapping matching three.js SphereGeometry UVs. */
function latLngToPosition(lat, lng, radius = 1) {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);
	return [
		-radius * Math.cos(theta) * Math.sin(phi),
		radius * Math.cos(phi),
		radius * Math.sin(theta) * Math.sin(phi)
	];
}
/** Default view: East Asia facing the camera. */
var INITIAL_CAMERA = latLngToPosition(21, 125, CAMERA_HOME_DISTANCE);
function formatCoords(lat, lng) {
	const ns = lat >= 0 ? "N" : "S";
	const ew = lng >= 0 ? "E" : "W";
	return `${Math.abs(lat).toFixed(2)}°${ns}  ${Math.abs(lng).toFixed(2)}°${ew}`;
}
function lerpAngle(a, b, t) {
	let diff = b - a;
	while (diff > Math.PI) diff -= Math.PI * 2;
	while (diff < -Math.PI) diff += Math.PI * 2;
	return a + diff * t;
}
function easeOutCubic(t) {
	return 1 - (1 - t) ** 3;
}
var useGlobeStore = create((set, get) => ({
	selectedId: null,
	hoveredId: null,
	flyTo: {
		to: "home",
		nonce: 0
	},
	autoRotateEnabled: true,
	interacting: false,
	isFlying: false,
	assetsReady: false,
	mobileListOpen: false,
	reducedMotion: false,
	select: (id) => set({
		selectedId: id,
		flyTo: {
			to: id,
			nonce: get().flyTo.nonce + 1
		},
		mobileListOpen: false
	}),
	clearSelection: () => set({
		selectedId: null,
		flyTo: {
			to: "relax",
			nonce: get().flyTo.nonce + 1
		}
	}),
	goHome: () => set({
		selectedId: null,
		flyTo: {
			to: "home",
			nonce: get().flyTo.nonce + 1
		}
	}),
	hover: (id) => set({ hoveredId: id }),
	setAutoRotateEnabled: (autoRotateEnabled) => set({ autoRotateEnabled }),
	setInteracting: (interacting) => set({ interacting }),
	setFlying: (isFlying) => set({ isFlying }),
	setAssetsReady: (assetsReady) => set({ assetsReady }),
	setMobileListOpen: (mobileListOpen) => set({ mobileListOpen }),
	setReducedMotion: (reducedMotion) => set({
		reducedMotion,
		autoRotateEnabled: reducedMotion ? false : get().autoRotateEnabled
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var REGIONS = [
	"極地",
	"歐洲",
	"非洲與西亞",
	"亞洲",
	"大洋洲",
	"美洲"
];
var LOCATIONS = [
	{
		id: "mcmurdo",
		nameZh: "麥克默多站",
		nameEn: "McMurdo Station",
		country: "南極洲",
		region: "極地",
		lat: -77.8419,
		lng: 166.6863,
		blurb: "南極最大的科研聚落，極夜裡的燈火像釘在冰原上的座標。"
	},
	{
		id: "reykjavik",
		nameZh: "雷克雅維克",
		nameEn: "Reykjavík",
		country: "冰島",
		region: "極地",
		lat: 64.1466,
		lng: -21.9426,
		blurb: "世界最北的首都。大西洋裂谷與極光在此交會，城市本身幾乎是一座港口。"
	},
	{
		id: "tromso",
		nameZh: "特羅姆瑟",
		nameEn: "Tromsø",
		country: "挪威",
		region: "極地",
		lat: 69.6492,
		lng: 18.9553,
		blurb: "北極圈內的門戶城市。冬夜漫長，北極光在峽灣上方緩慢開合。"
	},
	{
		id: "london",
		nameZh: "倫敦",
		nameEn: "London",
		country: "英國",
		region: "歐洲",
		lat: 51.5074,
		lng: -.1278,
		blurb: "泰晤士河上的帝國餘韻。經線從格林威治出發，把全世界量成一張網。"
	},
	{
		id: "paris",
		nameZh: "巴黎",
		nameEn: "Paris",
		country: "法國",
		region: "歐洲",
		lat: 48.8566,
		lng: 2.3522,
		blurb: "塞納河心的島城。石橋、林蔭與博物館把時間疊成可走的層次。"
	},
	{
		id: "venice",
		nameZh: "威尼斯",
		nameEn: "Venice",
		country: "義大利",
		region: "歐洲",
		lat: 45.4408,
		lng: 12.3155,
		blurb: "建在潟湖木樁上的城市。沒有馬路，只有潮汐與倒影在巷弄裡換班。"
	},
	{
		id: "cairo",
		nameZh: "開羅",
		nameEn: "Cairo",
		country: "埃及",
		region: "非洲與西亞",
		lat: 30.0444,
		lng: 31.2357,
		blurb: "尼羅河三角洲的門戶。吉薩的三角錐在霾色裡仍舊量得出太陽的角度。"
	},
	{
		id: "cape-town",
		nameZh: "開普敦",
		nameEn: "Cape Town",
		country: "南非",
		region: "非洲與西亞",
		lat: -33.9249,
		lng: 18.4241,
		blurb: "桌山俯視兩洋交會。城市夾在峭壁與海岬之間，風是常駐的居民。"
	},
	{
		id: "petra",
		nameZh: "佩特拉",
		nameEn: "Petra",
		country: "約旦",
		region: "非洲與西亞",
		lat: 30.3285,
		lng: 35.4444,
		blurb: "從峽谷走出來的玫瑰石城。納巴泰人把岩壁鑿成門面，沙漠負責保存。"
	},
	{
		id: "dubai",
		nameZh: "杜拜",
		nameEn: "Dubai",
		country: "阿拉伯聯合大公國",
		region: "非洲與西亞",
		lat: 25.2048,
		lng: 55.2708,
		blurb: "波斯灣南岸的垂直城市。沙漠、港口與玻璃塔同時存在於同一條地平線。"
	},
	{
		id: "taipei",
		nameZh: "台北",
		nameEn: "Taipei",
		country: "台灣",
		region: "亞洲",
		lat: 25.033,
		lng: 121.5654,
		blurb: "盆地裡的島嶼首都。山、雨與夜市把一座現代城市壓成親密的尺度。"
	},
	{
		id: "kyoto",
		nameZh: "京都",
		nameEn: "Kyoto",
		country: "日本",
		region: "亞洲",
		lat: 35.0116,
		lng: 135.7681,
		blurb: "千年古都。社寺沿東山鋪開，季節比交通號誌更準時地更換城市的顏色。"
	},
	{
		id: "singapore",
		nameZh: "新加坡",
		nameEn: "Singapore",
		country: "新加坡",
		region: "亞洲",
		lat: 1.3521,
		lng: 103.8198,
		blurb: "馬六甲海峽的樞紐島。赤道氣候裡，港口、花園與金融區被規劃成同一張圖。"
	},
	{
		id: "angkor",
		nameZh: "吳哥窟",
		nameEn: "Angkor Wat",
		country: "柬埔寨",
		region: "亞洲",
		lat: 13.4125,
		lng: 103.867,
		blurb: "高棉帝國的石構宇宙。護城河圍出一座山，浮雕把神話走成走廊。"
	},
	{
		id: "sydney",
		nameZh: "雪梨",
		nameEn: "Sydney",
		country: "澳洲",
		region: "大洋洲",
		lat: -33.8688,
		lng: 151.2093,
		blurb: "港灣城市。歌劇院的殼片對著太平洋，把一條殖民海岸線變成地標。"
	},
	{
		id: "new-york",
		nameZh: "紐約",
		nameEn: "New York",
		country: "美國",
		region: "美洲",
		lat: 40.7128,
		lng: -74.006,
		blurb: "哈德遜河口的垂直群島。街道是網格，天際線是不斷重寫的草稿。"
	},
	{
		id: "machu-picchu",
		nameZh: "馬丘比丘",
		nameEn: "Machu Picchu",
		country: "秘魯",
		region: "美洲",
		lat: -13.1631,
		lng: -72.545,
		blurb: "安第斯山脊上的印加遺址。雲霧來去，石階仍對準太陽與聖谷。"
	},
	{
		id: "rio",
		nameZh: "里約熱內盧",
		nameEn: "Rio de Janeiro",
		country: "巴西",
		region: "美洲",
		lat: -22.9068,
		lng: -43.1729,
		blurb: "山海之間的城市。基督像守著海灣，沙岸把整座山脈接到大西洋。"
	}
];
var LOCATIONS_BY_ID = Object.fromEntries(LOCATIONS.map((l) => [l.id, l]));
function locationsByRegion() {
	return REGIONS.map((region) => ({
		region,
		items: LOCATIONS.filter((l) => l.region === region)
	})).filter((g) => g.items.length > 0);
}
function GlobeView() {
	const [Scene, setScene] = (0, import_react.useState)(null);
	const setReducedMotion = useGlobeStore((s) => s.setReducedMotion);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReducedMotion(media.matches);
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, [setReducedMotion]);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./GlobeCanvas-w4kuJde3.mjs").then((mod) => {
			if (live) setScene(() => mod.GlobeCanvas);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!Scene) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 bg-bg",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tracking-tight text-fg",
				children: "Meridian"
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,opacity,transform] duration-(--motion-quick) ease-(--ease-out) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:bg-fg/90",
			ghost: "text-fg hover:bg-surface-2",
			outline: "border border-border bg-surface text-fg hover:bg-surface-2"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-11 rounded-md px-3 text-sm",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var groups = locationsByRegion();
function Hud() {
	const selectedId = useGlobeStore((s) => s.selectedId);
	const hoveredId = useGlobeStore((s) => s.hoveredId);
	const autoRotateEnabled = useGlobeStore((s) => s.autoRotateEnabled);
	const mobileListOpen = useGlobeStore((s) => s.mobileListOpen);
	const reducedMotion = useGlobeStore((s) => s.reducedMotion);
	const select = useGlobeStore((s) => s.select);
	const clearSelection = useGlobeStore((s) => s.clearSelection);
	const goHome = useGlobeStore((s) => s.goHome);
	const hover = useGlobeStore((s) => s.hover);
	const setAutoRotateEnabled = useGlobeStore((s) => s.setAutoRotateEnabled);
	const setMobileListOpen = useGlobeStore((s) => s.setMobileListOpen);
	const selected = selectedId ? LOCATIONS_BY_ID[selectedId] : void 0;
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") {
				if (mobileListOpen) setMobileListOpen(false);
				else clearSelection();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		clearSelection,
		mobileListOpen,
		setMobileListOpen
	]);
	(0, import_react.useEffect)(() => {
		if (!selectedId) return;
		document.querySelector(`[data-loc="${selectedId}"]`)?.scrollIntoView({
			block: "nearest",
			behavior: reducedMotion ? "auto" : "smooth"
		});
	}, [selectedId, reducedMotion]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("pointer-events-auto panel-scroll fixed z-20 flex flex-col border-border bg-surface", "inset-x-3 bottom-3 rounded-xl border", mobileListOpen ? "sheet-open" : null, "md:inset-auto md:bottom-auto md:left-0 md:top-0 md:h-full md:w-80 md:rounded-none md:border-0 md:border-r"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-start justify-between gap-3 px-5 pt-5 pb-4 md:px-6 md:pt-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted uppercase",
								children: "Observatory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display mt-1 text-2xl leading-tight tracking-tight text-fg text-balance",
								children: "Meridian"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "精選地標地球儀"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							"aria-expanded": mobileListOpen,
							"aria-label": mobileListOpen ? "收合地標列表" : "展開地標列表",
							onClick: () => setMobileListOpen(!mobileListOpen),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform duration-(--motion-fast) ease-(--ease-out)", mobileListOpen ? "rotate-0" : "rotate-180") })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("min-h-0 flex-1 overflow-y-auto px-3 pb-3 md:px-4", !mobileListOpen && "max-md:hidden"),
						children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "px-2 pb-2 text-xs tracking-widest text-subtle",
								children: group.region
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-0.5",
								children: group.items.map((loc) => {
									const isOn = loc.id === selectedId;
									const isHot = loc.id === hoveredId;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"data-loc": loc.id,
										onClick: () => select(loc.id),
										onMouseEnter: () => hover(loc.id),
										onMouseLeave: () => hover(null),
										className: cn("flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-(--motion-quick) ease-(--ease-out)", isOn ? "bg-surface-2" : isHot ? "bg-surface-2/70" : "hover:bg-surface-2/50"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 shrink-0 rounded-full", isOn ? "bg-accent" : "bg-subtle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-sm text-fg",
												children: loc.nameZh
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-xs text-muted",
												children: loc.nameEn
											})]
										})]
									}) }, loc.id);
								})
							})]
						}, group.region))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "border-t border-border px-5 py-4 md:px-6",
						children: [selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg leading-snug text-fg",
									children: selected.nameZh
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										selected.nameEn,
										" · ",
										selected.country
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "關閉聚焦",
									onClick: clearSelection,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono mt-2 text-xs text-subtle tabular-nums",
								children: formatCoords(selected.lat, selected.lng)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-3 text-sm leading-normal text-pretty text-muted", !mobileListOpen && "max-md:hidden"),
								children: selected.blurb
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-normal text-muted",
							children: "拖曳旋轉地球。點擊發光標記，或從列表選擇地標以聚焦。"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-subtle tabular-nums",
							children: [LOCATIONS.length, " 處地標"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hud-tr pointer-events-auto fixed z-20 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					"aria-pressed": autoRotateEnabled,
					onClick: () => setAutoRotateEnabled(!autoRotateEnabled),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: autoRotateEnabled ? "自動旋轉" : "旋轉已停" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					"aria-label": "回到預設視角",
					onClick: goHome,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" })
				})]
			})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeView, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
//#endregion
export { useGlobeStore as a, INITIAL_CAMERA as c, lerpAngle as d, cn as i, easeOutCubic as l, LOCATIONS as n, CAMERA_FOCUS_DISTANCE as o, LOCATIONS_BY_ID as r, CAMERA_HOME_DISTANCE as s, routes_exports as t, latLngToPosition as u };
