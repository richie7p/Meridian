# PDF audit follow-up — 2026-10-04

This file maps the 2026-10-03 portfolio audit to implemented changes and evidence. Repeated dependency/build findings in the PDF refer to the same remediation. Local checks use Windows, Node 22.23.2 and npm 10.9.8. CI runs the same install/lint/typecheck/test/build gates on Ubuntu and Windows, and production browser interactions on Ubuntu.

## Reproducible checks

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm audit --audit-level=high
npm run build
npm run check:bundle
npx playwright install chromium
npm run test:e2e
```

`test:scaffold` and `test:domain` report separate suites. E2E runs Chromium desktop and a Pixel 7 viewport/touch context against the production build. Set `E2E_DEV=1` to exercise the development server. This is browser emulation, not physical-device certification. Screenshots and Playwright traces are retained for diagnosis.

## Shared fixes

- **Windows build P1:** the app environment wrapper resolves the installed Vite JavaScript entry and launches it with the current Node executable. It preserves environment precedence, signal and exit propagation, without command-shell interpolation. A regression test invokes `vite --version` through this wrapper; the standard `npm run build` is exercised in both OS jobs.
- **Typecheck/lint P2:** safely narrow router errors before reading their message; document the intentional opaque-token fallback in the connector catch. Existing lint rules and TypeScript strictness remain enabled. Test fixture directory links use Windows junctions; generic PWA tests run against an isolated empty fixture rather than inheriting this app's real share-card configuration.
- **Dependency P2 (repeated):** compatible lockfile updates remove the observed js-yaml/fast-uri/brace-expansion findings. Clean `npm ci` and current full-tree `npm audit` passed with zero findings. This is a dated scan, not a guarantee against future advisories; CI repeats the scan.
- **Build reproducibility:** generated `.vercel` output is excluded from version control and rebuilt by CI. Source assets, branding, platform middleware and app environment flags are retained.
- **Performance:** compiler-supported `createClientOnlyFn` imports remove browser renderers from the SSR graph. Named renderer/runtime chunks are cached separately. A bundle gate measures gzip transfer size (200 KiB per ordinary JS chunk) and checks that renderer chunks do not reappear in SSR. Raw-size Vite warnings remain visible; splitting does not eliminate total bytes or prove GPU performance.

References: [TanStack environment functions](https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions), [Vite production chunking](https://vite.dev/guide/build).

## PDF pages 15–16

| Finding | Change / evidence | Status |
| --- | --- | --- |
| Windows wrapper (P1 and repeated P2) | Shared fix; standard build on both OSes | Addressed |
| Large globe/SSR Drei payload | Browser-only import removes the roughly 2.64 MB server Drei payload. Globe application chunk is about 30 kB raw / 10 kB gzip; renderer libraries remain separately cached. Gzip transfer budget runs in CI | Mitigated; device profiling remains |
| Fixed six-second ready timeout | Removed false-ready timeout. Texture completion controls readiness. Browser test withholds the day texture for >6 seconds and verifies loading remains, then releases it and verifies completion | Addressed |
| WebGL/texture fallback | Scene error boundary preserves the catalogue and offers reload; a WebGL 2 preflight releases its temporary context and shows a fallback before loading the renderer on unsupported devices. Browser tests block a texture and still select a catalogue location | Addressed for tested failure path |
| Domain and interaction coverage | 7 domain tests cover sphere mapping, radius, shortest-angle camera interpolation, hemisphere formatting, catalogue bounds/groups, selection/camera requests and reduced motion; desktop/mobile E2E covers readiness, selection, home, slow/failed resources and disabled WebGL | Addressed within listed cases |
| Reduced-motion camera state | Switching into reduced motion cancels active flight and restores controls, rather than retaining stale animation state | Addressed |
| Catalogue/media provenance (P3) | `CATALOG-PROVENANCE.json` inventories each location and texture SHA-256, with source/license fields explicitly unverified. Existing README's generic NASA/three.js attribution does not establish the exact files' provenance | Owner evidence required |

## Remaining verification

Actual content sources, dates, coordinates, editorial factual claims and rights for each texture/share image need owner review; the provenance inventory intentionally does not invent evidence. Camera/marker selection across GPU/browser families, unsupported GPU devices, physical mobile touch/pinch and long-session memory require further hardware checks. No deployment or license clearance is claimed.

## Local result

- Clean install, lint, typecheck (including tests), standard production build and bundle gate: passed.
- Scaffold: 196 script tests + 24 auth/connector tests passed.
- Product domain: 7 passed. Production E2E: 8 passed (desktop/mobile).
- Current full dependency audit: 0 vulnerabilities.
- Desktop/mobile screenshots inspected: visible globe and responsive catalogue, no horizontal overflow.

## Content and function acceptance update

See [the 2026-10-04 acceptance record](CONTENT-FUNCTION-ACCEPTANCE.md) for the additional content review, fixes, regression cases and limits. Earlier counts above describe the audit baseline.
