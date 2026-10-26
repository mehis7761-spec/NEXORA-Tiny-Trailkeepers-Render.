# NEXORA ArtCraft actual GitHub public-runner test — 2026-10-26 18:51–18:54 UTC

## Environment and provenance
- Main NEXORA repo remains private. Separate public repository is **mehis7761-spec/NEXORA-Tiny-Trailkeepers-Render.** (trailing period is part of its name).
- GitHub connector confirmed public repo write permissions.
- Local container: ffmpeg/ffprobe installed; FilmCraft/EffectCraft CLI absent; direct GitHub DNS lookup failed. Original 12-second H.264/AAC 1920×1080 MP4 exists locally with SHA256 `754b74c4c8e0fc16c4a7b0abade25f4eda7bfadf08e28b3bb6035e69e29eabab`.
- Public GitHub standard ubuntu-24.04 runner has working network. Official GitHub Actions docs state standard runners are free for public repos. Only standard public runner, apt FFmpeg, and no artifacts/cache used.

## Actions performed and verified
- Created and committed `.github/workflows/artcraft-release-probe.yml`, commit `f60d3684c9f34657ad35cb55465fd84f9b0af316`.
- GitHub automatically executed run 40381437797; both release archives downloaded and SHA256 verified against GitHub release API digests:
  - FilmCraft v0.13.0 Linux tarball: `40e9d685fb3ed1b0a21c9c02211f1a8499e09a47c551244ce7ee80f2584d3a9b`.
  - EffectCraft v0.17.0 Linux tarball: `cd7ace0d74734b79e851f18537c14b2953b7feb5da240f5005e6805476a15292`.
- Both `*-cli --help` commands ran with exit 0. First workflow failure was a shell `-e` inherited behavior when probing EffectCraft desktop binary; fixed to probe CLI only.
- Added native CLI smoke with synthetic input and official demo project, commit `c0736db9b4d29a439928f31e8feb1574356b6082`. Run 40381631607 revealed missing FFmpeg/FFprobe on GitHub runner, **not** missing ArtCraft binaries.
- Fixed by explicitly installing apt FFmpeg, commit `025b48b67f7314802145ef2fbc99d7339f2bbb1c`. Run 40381694489:
  - FilmCraft job **PASS**: native `filmcraft-cli probe` recognized H.264/AAC synthetic input; `filmcraft-cli --demo --save-as ... import` returned `{"errors":[],"items":[900011]}`; native FilmCraft demo export produced 1920×1080 H.264 MP4 duration 1.001s. FFmpeg fully decoded it without error. SHA256 `ccdb38e6a9646945029c93882bda7bfa3a94bad440c17927e5a9ba3e890d3288`. This export intentionally used `--no-audio`.
  - EffectCraft job was still running at log time; earlier run 40381631607 got past native EffectCraft demo MP4 creation, but FFprobe was missing, so it did NOT pass final media validation.
- Evidence: https://github.com/mehis7761-spec/NEXORA-Tiny-Trailkeepers-Render./actions/runs/40381694489

## Integration gate — still CLOSED
- Original **12-second** input has not been uploaded to the public repo and has NOT been imported by FilmCraft/EffectCraft on the GitHub runner.
- Neither tool has yet been proven to apply an effect to that original video and export its 12-second H.264/AAC MP4 with verified video and audio.
- GitHub connector supports text file creation but not uploading the existing binary MP4. Avoid leaking private code or keys.
- Native FilmCraft demo output has no audio by design, so it is **not** a full video+audio integration proof.
- Next: inspect EffectCraft run 40381694489 completion; provide an authorized safe way to stage original MP4; run editor-native import/effect/export; inspect both streams; keep paid services disabled.
