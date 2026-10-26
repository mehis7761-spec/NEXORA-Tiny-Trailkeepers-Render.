# Tiny Trailkeepers source staging

The public native ArtCraft pipeline automatically runs the **original 12-second end-to-end acceptance test** when `original_12s.mp4` is present in this directory.

Expected SHA256: `754b74c4c8e0fc16c4a7b0abade25f4eda7bfadf08e28b3bb6035e69e29eabab`.

Only the project's original, publishable video belongs here. Do not upload private NEXORA code, credentials or other private data. A mismatched file intentionally fails the SHA256 gate.

Upload via the repository's **assets → Add file → Upload files** and name the video exactly `original_12s.mp4`. The push event will automatically trigger `.github/workflows/native-chain-probe.yml`. A green synthetic-only run does NOT mean the original source passed.
