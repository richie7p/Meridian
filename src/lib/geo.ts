export const EARTH_RADIUS = 1;
export const CAMERA_HOME_DISTANCE = 2.72;
export const CAMERA_FOCUS_DISTANCE = 2.14;

/** Equirectangular sphere mapping matching three.js SphereGeometry UVs. */
export function latLngToPosition(
  lat: number,
  lng: number,
  radius = EARTH_RADIUS,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(theta) * Math.sin(phi);
  return [x, y, z];
}

/** Default view: East Asia facing the camera. */
export const INITIAL_CAMERA = latLngToPosition(21, 125, CAMERA_HOME_DISTANCE);

export function formatCoords(lat: number, lng: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${ns}  ${Math.abs(lng).toFixed(2)}°${ew}`;
}

export function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}
