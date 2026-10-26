# NEXORA ArtCraft checkpoint — 2026-10-26 21:39 UTC

## Actual GitHub Actions outcome
- Previous FilmCraft matrix job in run 40402137724 failed at FFmpeg installation: `timeout 150s apt-get update -qq` exited 124, so native CLI import/export never ran. EffectCraft demo job passed.
- Fixed `.github/workflows/artcraft-release-probe.yml` in commit `72ba904959326e717c7bd86d02a946f55cfd216d`: prefer preinstalled ffmpeg/ffprobe, then attempt direct bounded install using runner package indexes; only refresh apt lists if required.
- Automatic push-triggered run https://github.com/mehis7761-spec/NEXORA-Tiny-Trailkeepers-Render./actions/runs/40405944144 **SUCCESS** for BOTH FilmCraft and EffectCraft jobs (Ubuntu 24.04 free standard runners).
- FilmCraft 0.13.0: pinned archive SHA256 PASS; CLI help PASS; generated synthetic 320x180 H.264/AAC clip, CLI probe PASS, CLI import returned `errors: []` with item ID 900011; FilmCraft **demo project** exported 1.001 s, 1920x1080, video-only MP4, decoded with FFmpeg PASS. Import and export were separate CLI invocations against separate projects, so this does NOT prove that imported clip was placed on the exported timeline.
- EffectCraft 0.17.0: pinned archive SHA256 PASS; CLI help PASS; EffectCraft **demo project** exported 1.001 s, 1920x1080, video-only MP4, decoded with FFmpeg PASS.
- The actual 12.000 s 1920x1080 H.264/AAC Tiny Trailkeepers source was recovered from the earlier public-render ZIP in the conversation workspace (ZIP member `input.mp4`). SHA256 `754b74c4c8e0fc16c4a7b0abade25f4eda7bfadf08e28b3bb6035e69e29eabab`; 192 video frames at 16 fps; both audio and video streams. It has **not** been uploaded to this public GitHub repository and is **not** yet available inside GitHub Actions. Do not assume it will persist in future ephemeral workspaces.

## Remaining strict end-to-end acceptance gate
1. Stage the actual original 12 s source in the runner by an explicitly approved, accessible public asset route; never leak private NEXORA code/secrets.
2. Import it into FilmCraft, insert into a timeline, and save project.
3. Import the FilmCraft output into EffectCraft, apply a verified native effect, export a NEW MP4 with retained audio.
4. Independently assert ~12 s, 1920x1080, video+audio streams, full FFmpeg decode, visual frame samples, and a changed effect result. Retain artifacts and checksums.
5. Only after ALL pass declare 100% and stop recurring development.

No paid services, Higgsfield, or credits were used. **Integration gate remains CLOSED.**
