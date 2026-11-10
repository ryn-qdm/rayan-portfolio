# Rayan Abuqaddom: portfolio

React + TypeScript + Vite, Framer Motion for animation, Lenis for smooth scrolling. Plain CSS in one file.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # test the production build
```
Needs Node 18+.

## Where to change things
| I want to change… | Edit |
|---|---|
| Name, intro, email, **LinkedIn / GitHub links**, headline words, education, skills, honors, experience | `src/data/profile.ts` |
| Projects and case studies (add, remove, reorder, rewrite) | `src/data/projects.ts` |
| Colors and fonts | variables at the top of `src/index.css` |
| ID card look | `.idcard`, `.face` rules in `src/index.css`; content in `src/components/IdCard.tsx` |
| ID card feel (swing, weight, bounce) | constants and numbers in the `step()` function of `IdCard.tsx` (`G` = gravity, `55` = card stiffness, `3.2` = card damping) |
| Portrait | replace `src/assets/rayan.png` (transparent PNG) |
| CV | replace `public/Rayan_Abuqaddom_CV.pdf` (keep the name or update `cv` in `profile.ts`) |
| Page title / SEO | `index.html` |

LinkedIn and GitHub are empty in `profile.ts`, so those links stay hidden until you add them.

## Structure
```
src/
  data/        profile.ts, projects.ts   (all content)
  components/  IdCard, Headline, Nav, Magnetic, Motif, Sections
  pages/       Home, CaseStudy
  lib/         scroll.ts (smooth scrolling)
```

## Deploy
Run `npm run build`, then upload the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Routing uses `#/` URLs, so no server rewrite rules are needed.

## Accessibility
Keyboard: Tab to the ID card and press Enter to flip it. Reduced-motion users get no smooth scroll, no swinging and no transitions. The headline has a full text alternative for screen readers.

## Adding photos (no code changes)
1. Save the photo as `.webp` (about 900–1000px wide) with a numbered name, e.g. `07-conference.webp`.
2. Put it in the right folder under `src/assets/photos/`:
   - `projects/<project-slug>/` joins that project's 3D ring (`smart-drainage`, `brain-tumor-research`, `jordan-skyguide-ai`, `robotics`, `reco-coffee`).
   - `moments/` joins the Moments mosaic in the Experience section.
3. Optional caption: add one line in `src/data/photos.ts`.

A project with no photos keeps its line illustration, which is how Jordan SkyGuide AI currently looks.

## Project media (3D models, videos)
- 3D model: put a `.glb` in `public/media/` and set `model: 'File.glb'` on the project in `src/data/projects.ts`. Visitors can drag, zoom and it auto-rotates (Google `model-viewer`, loaded only on that project's page).
- Video: put an `.mp4` and a poster `.jpg` in `public/media/` and set `video: { src, poster }`.
- Photos: `src/assets/photos/projects/<slug>/` becomes that project's editorial gallery (needs 3 or more). Brain Tumor keeps its rotating ring (`visual: 'ring'`).
- Colors: the violet palette is the `--violet*` variables at the top of `src/index.css`.
