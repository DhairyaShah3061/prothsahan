# shadcn Setup Notes

This workspace is still a static HTML site, so the React files here are integration-ready references rather than a running app. To actually render them, the project needs a React + TypeScript + Tailwind setup.

## Default paths
- Components: `components/ui`
- Styles: `app/globals.css` or `src/app/globals.css`

Keeping UI primitives in `components/ui` matters because shadcn-generated components and imports such as `@/components/ui/dithering-shader` assume that folder layout. If the folder does not exist, create it before pasting components so the alias stays consistent.

## Setup commands
If you want this component to run in a real React app, start with:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Then initialize shadcn:

```bash
npx shadcn@latest init
```

## Dependency notes
- The `dithering-shader` component uses WebGL2 directly and does not need extra runtime packages.
- The `isometric-wave-grid-background` component uses Canvas 2D APIs directly and does not need extra runtime packages.
- The `geometric-blur-mesh` component uses WebGL and does not need extra runtime packages.
- The sample `wave-1.tsx` component needs the `cn` helper from `@/lib/utils`.
- If you want a standard shadcn helper, replace `lib/utils.ts` with the usual `clsx` + `tailwind-merge` version after installing those packages.

## Files copied
- `components/ui/dithering-shader.tsx`
- `components/ui/wave-1.tsx`
- `components/ui/isometric-wave-grid-background.tsx`
- `components/ui/geometric-blur-mesh.tsx`
- `components/ui/demo.tsx`

## Notes
- The component does not require context providers.
- It does not require `lucide-react` unless you want to replace other SVGs later.
- To use the wave demo in a real app, pass black as the background and a crimson front color, for example `colorBack="#000000"` and `colorFront="#dc143c"`.

## Integration assumptions for this component
- Props passed: `color`, `speed`, and `density` (defaults are built in).
- State management: local animation state only, no external store needed.
- Required assets: none (no images/icons required).
- Responsive behavior: fills parent container and redraws on resize.
- Best placement: full-bleed section backgrounds like hero or stats blocks.

## Integration assumptions for geometric blur mesh
- Props passed: none by default (`Component` wrapper export).
- State management: internal state only (shape index and mouse damping).
- Required assets: none.
- Responsive behavior: fills parent container and resizes with viewport.
- Best placement: section backgrounds or full-screen hero blocks where click interaction is acceptable.
