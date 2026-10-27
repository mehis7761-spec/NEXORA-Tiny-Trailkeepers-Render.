# Original 12-second FilmCraft + EffectCraft gate — 2026-10-27

## Resolved through private local processing
The original-input technical integration gate was verified in a private local workspace on 2026-10-27. Publishing the original into this public repository is **not required** and must not be used as the default workaround.

The verified path was: official SHA256-pinned FilmCraft 0.13.0 import → clean linked video/audio timeline → native H.264 export → EffectCraft 0.17.0 import/composition → native Gaussian Blur + Invert test → native H.264 export.

Verification covered:
- 1920×1080, 16fps, all 192 video frames and a 12-second video stream.
- Complete decoding of the source and all native outputs without errors.
- Numerical comparisons of every frame and visual review at five timeline checkpoints.
- Audio preservation across the beginning, middle and end, including correlation with the original.
- A separate EffectCraft no-effect control; inverted/blurred colours in the diagnostic output are intentional test effects.

The EffectCraft container duration is 12.010 seconds due to audio packet padding. A small FilmCraft colour shift was measured and documented privately; pixel-identical output is not claimed. Private outputs, full logs, saved native projects and QA reports are retained privately. This closes the technical fixture only, not an episode-quality or publication gate.

## Public-run scope remains unchanged
GitHub Actions run 40468318697 is still a successful **synthetic 2-second** run. It must not be represented as an original-input run. No original footage or derived private media was uploaded here.

## Historical blocker
Earlier checks found only `assets/README.md` and no original MP4. The original was subsequently materialized into a private workspace, and the official native binaries were downloaded and run there. Do not request a public upload or repeat completed integration work merely because the original remains absent from this public repository.
