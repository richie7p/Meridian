import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
test("texture readiness, landmark selection, home and reduced motion", async ({ page, isMobile }, info) => {
  const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("status", { name: "載入地球儀" })).toBeHidden();
  await expect(page.getByRole("button", { name: "旋轉已停", exact: true })).toBeVisible();
  if (isMobile) await page.getByRole("button", { name: "展開地標列表" }).click();
  await page.locator('[data-loc="taipei"]').click();
  await expect(page.getByRole("button", { name: "關閉聚焦" })).toBeVisible();
  await expect(page.locator("footer")).toContainText("台北");
  await page.getByRole("button", { name: "回到預設視角" }).click();
  await expect(page.getByRole("button", { name: "關閉聚焦" })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true); expect(errors).toEqual([]);
  await mkdir("screenshots", { recursive: true }); await page.screenshot({ path: `screenshots/${info.project.name}.png` });
});
test("slow textures never become ready merely because six seconds elapsed", async ({ page }) => {
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/textures/earth-day.jpg", async route => { await gate; await route.continue(); });
  await page.goto("/", { waitUntil: "domcontentloaded" }); await expect(page.getByRole("status", { name: "載入地球儀" })).toBeVisible();
  await page.waitForTimeout(6500); await expect(page.getByRole("status", { name: "載入地球儀" })).toBeVisible();
  release(); await expect(page.getByRole("status", { name: "載入地球儀" })).toBeHidden();
});
test("texture failure preserves the landmark catalogue", async ({ page, isMobile }) => {
  await page.route("**/textures/earth-day.jpg", route => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" }); await expect(page.getByRole("alert")).toContainText("地球儀無法載入");
  if (isMobile) await page.getByRole("button", { name: "展開地標列表" }).click();
  await page.locator('[data-loc="paris"]').click(); await expect(page.locator("footer")).toContainText("巴黎");
});

test("unsupported WebGL leaves an accessible catalogue and visible fallback", async ({ page, isMobile }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, kind: string, ...args: unknown[]) {
      if (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl") return null;
      return original.apply(this, [kind, ...args] as Parameters<typeof original>);
    } as typeof original;
  });
  await page.goto("/", { waitUntil: "domcontentloaded" }); await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByRole("status", { name: "載入地球儀" })).toBeHidden();
  if (isMobile) await page.getByRole("button", { name: "展開地標列表" }).click();
  await page.locator('[data-loc="paris"]').click(); await expect(page.locator("footer")).toContainText("巴黎");
});

test("corrected geographic descriptions render for each selected landmark", async ({ page, isMobile }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("status", { name: "載入地球儀" })).toBeHidden();
  for (const [id, description] of [["cape-town", "厄加勒斯角"], ["singapore", "新加坡海峽"], ["venice", "歷史城區"]]) {
    if (isMobile) await page.getByRole("button", { name: "展開地標列表" }).click();
    await page.locator(`[data-loc="${id}"]`).click();
    await expect(page.locator("footer")).toContainText(description);
  }
  if (isMobile) await page.getByRole("button", { name: "展開地標列表" }).click();
  const marker = page.locator('[data-marker-label="venice"]');
  await expect(marker).toBeAttached();
  const labelLayer = await marker.evaluate(node => {
    const layers: number[] = [];
    for (let element: HTMLElement | null = node as HTMLElement; element; element = element.parentElement) {
      const layer = Number.parseInt(getComputedStyle(element).zIndex);
      if (Number.isFinite(layer)) layers.push(layer);
    }
    return Math.max(...layers);
  });
  const panelLayer = await page.locator("aside").evaluate(node => Number.parseInt(getComputedStyle(node).zIndex));
  expect(labelLayer).toBeLessThan(panelLayer);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await mkdir("screenshots", { recursive: true });
  await page.screenshot({ path: `screenshots/${info.project.name}-content.png` });
});
