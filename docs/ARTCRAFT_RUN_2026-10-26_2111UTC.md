# ArtCraft public-runner checkpoint — 2026-10-26

## Verified this session
- Public render smoke workflow originally failed with FFmpeg absent. A pipeline to `head` had masked the missing command in the verification step. It now installs FFmpeg and checks both executable paths with strict shell failure handling and bounded apt timeouts.
- Public Actions run https://github.com/mehis7761-spec/NEXORA-Tiny-Trailkeepers-Render./actions/runs/40402051440 completed successfully: synthetic 3-second H.264/AAC video generated and decoded. This is an infrastructure smoke test, not proof of ArtCraft integration.
- ArtCraft probe run https://github.com/mehis7761-spec/NEXORA-Tiny-Trailkeepers-Render./actions/runs/40402137724: EffectCraft job completed successfully, rendering and decoding its own 1.001-second 1920x1080 demo with audio disabled. Original footage and its audio were not tested. Consult live run status for FilmCraft job completion.
- ArtCraft FFmpeg setup now has bounded apt retries and timeouts; FilmCraft import errors no longer get swallowed. No paid runners or private assets were used.

## Remaining gate
The original 12-second clip must be staged without exposing private assets or secrets, imported into FilmCraft and EffectCraft, processed with an actual editor-native effect and exported as 1920x1080 MP4 with audio. Verify duration, audio/video streams, full decode and visual frames. Do not represent demo-only runs or an FFmpeg-only test as completion.
