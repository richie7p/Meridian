# Content and function acceptance — 2026-10-04

All 18 catalogue entries have unique IDs and coordinates within geographic bounds. Corrected three descriptions: Venice's historic centre uses canals/bridges/walking lanes; the official Atlantic/Indian meeting point is Cape Agulhas; Singapore's port lies beside the Singapore Strait. Claim-level primary links and the checked date are recorded in [the provenance inventory](CATALOG-PROVENANCE.json). Other descriptions, exact coordinates and media rights remain unverified.

Lint, typecheck, build, 220 shared/scaffold and seven domain tests pass. Ten production desktop/Pixel 7 cases cover selection/home, reduced motion, slow textures, texture failure, unsupported WebGL and rendering of the corrected descriptions. Development uses the same cases. Tests wait for the loading state before interacting and reopen the mobile catalogue after each selection, matching its automatic-close behavior.

Visual review found floating marker labels painting over the expanded mobile catalogue. Their layer range now stays below the overlay; the browser case checks that layer relationship and captures both viewport screenshots. The earlier eight browser cases remain included. Software browser coverage does not certify physical-device performance or texture licensing. Latest hosted results belong to the draft PR head.
