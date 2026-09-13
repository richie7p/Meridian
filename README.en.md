# Meridian

[繁體中文](README.md) | **English**

**[Live Demo / 線上展示](https://glow-raven-quartz-opal.grok.me/)**

A 3D globe featuring a curated collection of landmarks. Drag to rotate and click a glowing marker to focus.

<p align="center">
  <img src="public/og.jpg" alt="Meridian — Earth from orbit" width="1200" />
</p>

A full-viewport WebGL scene with Earth textures, a day/night boundary, clouds, atmospheric glow, and 18 world landmarks. Auto-rotation pauses during interaction, while the camera smoothly travels to selected locations using spherical interpolation.

## Features

- Draggable, zoomable 3D Earth with damped inertia
- Soft ambient lighting, nighttime city lights, and a Fresnel atmosphere
- Glowing landmarks; select a marker or sidebar entry to focus
- Auto-rotation pauses during interaction and resumes after inactivity
- Desktop sidebar and mobile bottom panel with coordinates and descriptions
- Respects `prefers-reduced-motion`

## Controls

| Action | Desktop | Touch |
| --- | --- | --- |
| Rotate | Drag | Drag with one finger |
| Zoom | Scroll wheel | Pinch with two fingers |
| Focus a landmark | Click a marker or list entry | Tap a marker or open the list |
| Pause auto-rotation | Toggle at the top right | Same toggle |
| Reset the view | Compass button | Compass button |
| Clear focus | `Esc` or close | Close |

## Landmarks

18 locations organized by region: polar regions, Europe, Africa and West Asia, Asia, Oceania, and the Americas.

Reykjavík, Tromsø, McMurdo Station, London, Paris, Venice, Cairo, Cape Town, Petra, Dubai, Taipei, Kyoto, Singapore, Angkor Wat, Sydney, New York, Machu Picchu, and Rio de Janeiro.

Location data lives in [`src/lib/locations.ts`](src/lib/locations.ts).

## Tech stack

- [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start)
- [Three.js](https://threejs.org/) · [React Three Fiber](https://r3f.docs.pmnd.rs/) · [drei](https://github.com/pmndrs/drei)
- [Tailwind CSS v4](https://tailwindcss.com/) · [Zustand](https://github.com/pmndrs/zustand)
- Node 22

## Getting started

Requires Node.js 22 and npm.

```bash
git clone https://github.com/richie7p/Meridian.git
cd Meridian
npm install
npm run dev
```

The development server defaults to `http://localhost:8080`.

```bash
npm run build       # Production build
npm run typecheck   # TypeScript checks
```

## Project structure

```text
src/
  components/globe/     Earth, atmosphere, stars, markers, and camera
  components/overlay/   Landmark list and controls
  lib/locations.ts      Curated landmarks
  lib/geo.ts            Latitude/longitude ↔ spherical coordinates
  lib/store.ts          Selection, rotation, and camera commands
  routes/              TanStack file-based routes
public/textures/        Earth day/night/normal/specular/cloud textures
```

## License and assets

No project license file is included. Contact the repository owner before reuse. The original project notes identify the Earth textures as coming from Three.js example resources and NASA-style Blue Marble public imagery.
