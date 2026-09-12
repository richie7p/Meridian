import { create } from "zustand";

export type FlyKind = string | "home" | "relax";

type GlobeState = {
  selectedId: string | null;
  hoveredId: string | null;
  flyTo: { to: FlyKind; nonce: number };
  autoRotateEnabled: boolean;
  interacting: boolean;
  isFlying: boolean;
  assetsReady: boolean;
  mobileListOpen: boolean;
  reducedMotion: boolean;
  select: (id: string) => void;
  clearSelection: () => void;
  goHome: () => void;
  hover: (id: string | null) => void;
  setAutoRotateEnabled: (value: boolean) => void;
  setInteracting: (value: boolean) => void;
  setFlying: (value: boolean) => void;
  setAssetsReady: (value: boolean) => void;
  setMobileListOpen: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
};

export const useGlobeStore = create<GlobeState>((set, get) => ({
  selectedId: null,
  hoveredId: null,
  flyTo: { to: "home", nonce: 0 },
  autoRotateEnabled: true,
  interacting: false,
  isFlying: false,
  assetsReady: false,
  mobileListOpen: false,
  reducedMotion: false,
  select: (id) =>
    set({
      selectedId: id,
      flyTo: { to: id, nonce: get().flyTo.nonce + 1 },
      mobileListOpen: false,
    }),
  clearSelection: () =>
    set({
      selectedId: null,
      flyTo: { to: "relax", nonce: get().flyTo.nonce + 1 },
    }),
  goHome: () =>
    set({
      selectedId: null,
      flyTo: { to: "home", nonce: get().flyTo.nonce + 1 },
    }),
  hover: (id) => set({ hoveredId: id }),
  setAutoRotateEnabled: (autoRotateEnabled) => set({ autoRotateEnabled }),
  setInteracting: (interacting) => set({ interacting }),
  setFlying: (isFlying) => set({ isFlying }),
  setAssetsReady: (assetsReady) => set({ assetsReady }),
  setMobileListOpen: (mobileListOpen) => set({ mobileListOpen }),
  setReducedMotion: (reducedMotion) =>
    set({
      reducedMotion,
      autoRotateEnabled: reducedMotion ? false : get().autoRotateEnabled,
    }),
}));
