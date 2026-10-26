# NEXORA native ArtCraft chain — 2026-10-27 01:44 Europe/Tallinn

## Verified source in this automation's container
- Recovered `input.mp4` from `NEXORA_public_render_v2.zip` in the conversation workspace.
- SHA256: `754b74c4c8e0fc16c4a7b0abade25f4eda7bfadf08e28b3bb6035e69e29eabab`.
- `ffprobe`: 12.000000 s; 1920x1080; 16 fps; 192 video frames; audio stream present.
- Full FFmpeg decode PASS; extracted and visually inspected midpoint frame (original animated characters visible).
- This binary is available in the current ephemeral conversation container, **not in this GitHub repository**. The local container has no DNS access to github.com; the GitHub connector supports UTF-8 text writes, not direct upload of this binary. No unapproved third-party host was used.

## GitHub Actions real native tests
- New workflow: `.github/workflows/native-chain-probe.yml`. Official pinned FilmCraft 0.13.0 and EffectCraft 0.17.0 releases, SHA256-verified, on public Ubuntu standard runner.
- Initial run 40421120982: FilmCraft imported a synthetic 2 s H.264/AAC clip, placed it on the active V1/A1 timeline and exported 1920x1080 H.264/AAC MP4. EffectCraft stopped at `file.newCompFromSelection`: imported footage wasn't selected in the Project panel. Fixed using `project.select` and `file.newCompFromSelection` in the **same CLI session**.
- Run 40421209412: complete FilmCraft → EffectCraft native chain passed for **synthetic** 2 s source; EffectCraft `effect.apply` returned `ec.blur.gaussian`; both MP4 files had 1920x1080 video, audio, 2.005 s duration, full FFmpeg decode.
- Run 40421314713: strict visual comparison found **zero pixel difference** between EffectCraft output with/without Gaussian Blur. This correctly failed QA, despite nominal CLI success.
- Run 40421454773: added native Invert effect; visual comparison still zero. Frame analysis showed EffectCraft output **all black** (pixel mean 0) while FilmCraft output had nonzero pixels. Root cause: EffectCraft imported a relative `native/filmcraft.mp4` path then loaded a project from `native/`; footage was unresolved on subsequent CLI invocations.
- Run **40421553751 SUCCESS**: imported media by absolute path and ran `footage.check`. Both FilmCraft and EffectCraft outputs were 2.005 s, 1920x1080, video+audio, fully decodable. Unmodified EffectCraft frame mean 3.480; native Gaussian Blur + Invert output frame mean 246.716; mean absolute pixel difference **247.777 / 255**. Native effects changed actual decoded video pixels. Input is 320x180 centered in 1920x1080 frame, explaining low mean brightness before inversion; this is not a black-screen failure.
- New workflow commit `b9c434d47abc6c142b549f682d6e99b06d9f45c0` additionally supports **original 12-second source** when `assets/original_12s.mp4` is uploaded, verifies exact SHA256, switches native export duration to 12 seconds, checks both streams, full decode and frame differences, and labels original vs synthetic runs separately. Await the associated run for infrastructure validation; do not claim it passed until inspected.

## Remaining final gate
The **original 12-second MP4 binary** must be staged as `assets/original_12s.mp4` in this public repository, after which the GitHub workflow will run automatically. A passing synthetic run is not acceptance of the original-source task. On a real-original run, independently inspect GitHub Actions logs, 12 s, 1920x1080, audio, frame difference, full decode, and artifact before declaring completion.

No Higgsfield, paid runners, credits or secrets used. **100% READY is NOT yet justified.**
