import { useEffect } from "react";
import { ChevronDown, Compass, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCoords } from "@/lib/geo";
import { LOCATIONS, LOCATIONS_BY_ID, locationsByRegion } from "@/lib/locations";
import { useGlobeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const groups = locationsByRegion();

export function Hud() {
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

  const selected = selectedId ? LOCATIONS_BY_ID[selectedId] : undefined;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mobileListOpen) setMobileListOpen(false);
        else clearSelection();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearSelection, mobileListOpen, setMobileListOpen]);

  useEffect(() => {
    if (!selectedId) return;
    const node = document.querySelector(`[data-loc="${selectedId}"]`);
    node?.scrollIntoView({
      block: "nearest",
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [selectedId, reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="vignette absolute inset-0" />

      <aside
        className={cn(
          "pointer-events-auto panel-scroll fixed z-20 flex flex-col border-border bg-surface",
          "inset-x-3 bottom-3 rounded-xl border",
          mobileListOpen ? "sheet-open" : null,
          "md:inset-auto md:bottom-auto md:left-0 md:top-0 md:h-full md:w-80 md:rounded-none md:border-0 md:border-r",
        )}
      >
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 md:px-6 md:pt-7">
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">
              Observatory
            </p>
            <h1 className="font-display mt-1 text-2xl leading-tight tracking-tight text-fg text-balance">
              Meridian
            </h1>
            <p className="mt-1 text-sm text-muted">精選地標地球儀</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={mobileListOpen}
            aria-label={mobileListOpen ? "收合地標列表" : "展開地標列表"}
            onClick={() => setMobileListOpen(!mobileListOpen)}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-(--motion-fast) ease-(--ease-out)",
                mobileListOpen ? "rotate-0" : "rotate-180",
              )}
            />
          </Button>
        </header>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-3 pb-3 md:px-4",
            !mobileListOpen && "max-md:hidden",
          )}
        >
          {groups.map((group) => (
            <section key={group.region} className="mb-4">
              <h2 className="px-2 pb-2 text-xs tracking-widest text-subtle">
                {group.region}
              </h2>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((loc) => {
                  const isOn = loc.id === selectedId;
                  const isHot = loc.id === hoveredId;
                  return (
                    <li key={loc.id}>
                      <button
                        type="button"
                        data-loc={loc.id}
                        onClick={() => select(loc.id)}
                        onMouseEnter={() => hover(loc.id)}
                        onMouseLeave={() => hover(null)}
                        className={cn(
                          "flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-(--motion-quick) ease-(--ease-out)",
                          isOn
                            ? "bg-surface-2"
                            : isHot
                              ? "bg-surface-2/70"
                              : "hover:bg-surface-2/50",
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            isOn ? "bg-accent" : "bg-subtle",
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-fg">
                            {loc.nameZh}
                          </span>
                          <span className="block truncate text-xs text-muted">
                            {loc.nameEn}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <footer className="border-t border-border px-5 py-4 md:px-6">
          {selected ? (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg leading-snug text-fg">
                    {selected.nameZh}
                  </p>
                  <p className="text-sm text-muted">
                    {selected.nameEn} · {selected.country}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="關閉聚焦"
                  onClick={clearSelection}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <p className="font-mono mt-2 text-xs text-subtle tabular-nums">
                {formatCoords(selected.lat, selected.lng)}
              </p>
              <p
                className={cn(
                  "mt-3 text-sm leading-normal text-pretty text-muted",
                  !mobileListOpen && "max-md:hidden",
                )}
              >
                {selected.blurb}
              </p>
            </div>
          ) : (
            <p className="text-sm leading-normal text-muted">
              拖曳旋轉地球。點擊發光標記，或從列表選擇地標以聚焦。
            </p>
          )}
          <p className="mt-3 text-xs text-subtle tabular-nums">
            {LOCATIONS.length} 處地標
          </p>
        </footer>
      </aside>

      <div className="hud-tr pointer-events-auto fixed z-20 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-pressed={autoRotateEnabled}
          onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
        >
          <RotateCw className="size-4" />
          <span>{autoRotateEnabled ? "自動旋轉" : "旋轉已停"}</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="回到預設視角"
          onClick={goHome}
        >
          <Compass className="size-4" />
        </Button>
      </div>
    </div>
  );
}
