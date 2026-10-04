import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { latLngToPosition, formatCoords, lerpAngle, easeOutCubic } from "../../src/lib/geo";
import { LOCATIONS, LOCATIONS_BY_ID, REGIONS, locationsByRegion } from "../../src/lib/locations";
import { useGlobeStore } from "../../src/lib/store";
beforeEach(() => useGlobeStore.setState(useGlobeStore.getInitialState()));
test("geographic poles, meridian and date line map to the expected sphere axes", () => {
  for (const [lat, lng, expected] of [[90, 0, [0, 1, 0]], [0, 0, [1, 0, 0]], [0, 180, [-1, 0, 0]], [-90, 0, [0, -1, 0]]] as const) {
    latLngToPosition(lat, lng).forEach((n, i) => assert.ok(Math.abs(n - expected[i]!) < 1e-9));
  }
});
test("all catalogue markers lie on the requested radius", () => {
  for (const l of LOCATIONS) assert.ok(Math.abs(Math.hypot(...latLngToPosition(l.lat, l.lng, 2)) - 2) < 1e-9);
});
test("camera interpolation takes the short path across the date line", () => {
  assert.ok(Math.abs(lerpAngle(Math.PI - 0.1, -Math.PI + 0.1, 0.5) - Math.PI) < 1e-9);
  assert.equal(easeOutCubic(0), 0); assert.equal(easeOutCubic(1), 1);
});
test("coordinates display the correct hemispheres and precision", () => {
  assert.equal(formatCoords(-12.345, 67.891), "12.35°S  67.89°E");
  assert.equal(formatCoords(0, -0.5), "0.00°N  0.50°W");
});
test("catalogue IDs, bounds and region grouping are consistent", () => {
  assert.equal(new Set(LOCATIONS.map(l => l.id)).size, LOCATIONS.length);
  for (const l of LOCATIONS) { assert.equal(LOCATIONS_BY_ID[l.id], l); assert.ok(l.lat >= -90 && l.lat <= 90 && l.lng >= -180 && l.lng <= 180); assert.ok(REGIONS.some(r => r === l.region)); }
  assert.equal(locationsByRegion().flatMap(g => g.items).length, LOCATIONS.length);
});
test("select, repeat focus, clear and home create distinct camera requests", () => {
  const s = useGlobeStore.getState(); s.setMobileListOpen(true); s.select(LOCATIONS[0]!.id);
  assert.equal(useGlobeStore.getState().mobileListOpen, false); const first = useGlobeStore.getState().flyTo.nonce;
  s.select(LOCATIONS[0]!.id); assert.equal(useGlobeStore.getState().flyTo.nonce, first + 1);
  s.clearSelection(); assert.equal(useGlobeStore.getState().flyTo.to, "relax");
  s.goHome(); assert.equal(useGlobeStore.getState().flyTo.to, "home"); assert.equal(useGlobeStore.getState().selectedId, null);
});
test("reduced motion disables automatic rotation and readiness is explicit", () => {
  const s = useGlobeStore.getState(); s.setReducedMotion(true); assert.equal(useGlobeStore.getState().autoRotateEnabled, false);
  assert.equal(useGlobeStore.getState().assetsReady, false); s.setAssetsReady(true); assert.equal(useGlobeStore.getState().assetsReady, true);
});
