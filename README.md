# NEXORA Tiny Trailkeepers — public ArtCraft render tests

Public, isolated **free/open-source** FilmCraft + EffectCraft rendering tests. Do not commit NEXORA private code, credentials or other sensitive assets.

## Verified as of 2026-10-27

- Native FilmCraft **v0.13.0** → EffectCraft **v0.17.0** synthetic end-to-end test passed with actual 1920×1080 H.264/AAC MP4 export, effect application, frame comparison and decoded non-silent audio. [Actions run 40433762801](https://github.com/mehis7761-spec/NEXORA-Tiny-Trailkeepers-Render./actions/runs/40433762801).
- This uses a **2-second synthetic source**, not the original Tiny Trailkeepers footage. It is a verified infrastructure test, **not** final acceptance.
- A misleading earlier green test exported mostly black because 320×180 source was shown at native size on a 1920×1080 canvas. We added strict source/output frame similarity, audio RMS and output-resolution gates.
- The **original 12-second** source has not been uploaded to `assets/original_12s.mp4`. Until the original's exact SHA256 matches the value in `assets/README.md` and a full 12-second native-chain run passes, do **not** label integration 100% ready.

## Run original acceptance

Place the publishable original 12-second video at `assets/original_12s.mp4` using GitHub's Upload files. The `.github/workflows/native-chain-probe.yml` push trigger starts the native FilmCraft → EffectCraft pipeline, verifies SHA256 and then checks duration, 1920×1080 resolution, decoded audio, non-silent signal, source-to-export visual similarity and actual effect difference.

Artifacts expire after 1 day. Use GitHub-hosted standard public runners only; no Higgsfield or paid credits.
