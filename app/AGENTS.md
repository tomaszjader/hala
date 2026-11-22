# HALA — static website

This is a small Vite + React site published at https://tomaszjader.github.io/hala/.

- Preserve the existing scroll-scrub controller; keep scene arrays stable and derive posters from final encoded clips.
- Resolve public media with `assetUrl` so local `/` and production `/hala/` both work.
- Keep the layout responsive and preserve the reduced-motion fallbacks.
- Do not add server dependencies, runtime generation, tracking, secrets or unused UI scaffold.
- `bun run typecheck` and `SITE_BASE_PATH=/hala/ bun run build` must pass before publishing.
- Check desktop and mobile playback in both scroll directions after media or layout changes.
- GitHub Actions publishes `app/dist` on pushes to `main`; generated build output is not committed.