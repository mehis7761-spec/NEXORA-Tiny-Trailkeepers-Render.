# NEXORA ArtCraft checkpoint — 2026-10-27 01:48 EET

## Confirmed results
- Workflow `native-chain-probe.yml` runs on GitHub public Ubuntu standard runner with official SHA256-pinned FilmCraft 0.13.0 and EffectCraft 0.17.0.
- **Run 40422021032 SUCCESS**: FilmCraft imported a 2 s synthetic H.264/AAC source, placed it on V1/A1 timeline and exported 1920x1080 H.264/AAC MP4. EffectCraft imported that real exported file by **absolute path**, verified footage, created a composition, applied native Gaussian Blur (blurriness=20) and Invert, and exported a second 1920x1080 H.264/AAC MP4.
- Both outputs: duration 2.005 s, audio and video streams present, full FFmpeg decode PASS.
- Pixel check at 0.5 s: unmodified EffectCraft frame mean 3.480, modified frame mean 246.716, mean absolute difference 247.777/255. This proves actual native effect changed rendered pixels, not merely a command response.
- Earlier black-frame failure was caused by **relative media paths** resolving incorrectly after reopening the EffectCraft project. Absolute paths fixed it; see run 40421553751.
- Earlier `apt-get install ffmpeg` timed out (exit 124) in run 40421716624; bounded apt retry with visible logs in commit `78599e5abe541f24a02579a50544aa581aa953a2` passed on run 40422021032.

## Original 12-second acceptance remains blocked
- Original video was recovered from local `NEXORA_public_render_v2.zip`: SHA256 `754b74c4c8e0fc16c4a7b0abade25f4eda7bfadf08e28b3bb6035e69e29eabab`, 12.000 s, 1920x1080, 16 fps, audio present; full decode PASS; midpoint frame inspected.
- The original MP4 is **not present in the public repository**. The automation's local runtime cannot reach github.com (DNS resolution failure), while the GitHub connector's available file writes accept text, not direct local binary uploads.
- Created `assets/README.md` as staging folder. Upload the original video as `assets/original_12s.mp4` in the public repo. The workflow auto-detects it, validates SHA256, and runs a **12 s** FilmCraft → EffectCraft native render and audio/visual QA. No synthetic fallback is accepted as original-source success.
- Until a verified **original-source** run passes, the project is **NOT 100% complete**.

No Higgsfield, paid credits or private source exposure.
