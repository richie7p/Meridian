import { createFileRoute } from "@tanstack/react-router";
import { GlobeView } from "@/components/globe/GlobeView";
import { Hud } from "@/components/overlay/Hud";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <GlobeView />
      <Hud />
    </main>
  );
}
