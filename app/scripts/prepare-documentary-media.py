"""Encode HALA's Higgsfield downloads for scrolling and extract exact posters.

Run from the workspace: python app/scripts/prepare-documentary-media.py
Requires Pillow, imageio and imageio-ffmpeg. Original downloads stay in
artifacts/summer-source (local working files, excluded from the repository).
"""

from pathlib import Path
import json
import subprocess

import imageio.v3 as iio
import imageio_ffmpeg
from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "artifacts/summer-source"
PUBLIC = ROOT / "app/public/assets"
WORLD = PUBLIC / "world"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def encode(source: str, destination: str, filters: str) -> None:
    subprocess.run(
        [
            FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(SOURCE / source), "-t", "5", "-an",
            "-vf", filters + ",fps=24,format=yuv420p",
            "-c:v", "libx264", "-preset", "medium", "-crf", "24",
            "-g", "1", "-keyint_min", "1", "-sc_threshold", "0",
            "-movflags", "+faststart", str(WORLD / destination),
        ],
        check=True,
    )


def poster(clip: str, destination: str) -> Image.Image:
    frame = Image.fromarray(iio.imread(WORLD / clip, index=0, plugin="FFMPEG"))
    options = {"quality": 96, "subsampling": 0} if destination.endswith(".jpg") else {}
    frame.save(WORLD / destination, **options)
    return frame


encode("hero-summer.mp4", "scene-01.mp4",
       "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080")
encode("hero-summer.mp4", "scene-01-mobile.mp4",
       "scale=-2:960,crop=540:960:(iw-ow)*0.82:0")
encode("pasture-summer.mp4", "pasture-film.mp4",
       "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080")

hero = poster("scene-01.mp4", "scene-01-poster.png")
poster("scene-01-mobile.mp4", "scene-01-mobile-poster.png")
pasture = poster("pasture-film.mp4", "pasture-film-poster.jpg")
hero.save(PUBLIC / "brand/cover.jpg", quality=90)

portrait_source = SOURCE / "shepherd-summer.png"
if portrait_source.exists():
    Image.open(portrait_source).convert("RGB").save(
        PUBLIC / "photography/shepherd.webp", quality=90, method=6
    )

# The closing invitation has its own vertical image, independent of the films.
closing_source = SOURCE / "join-summer.png"
if closing_source.exists():
    Image.open(closing_source).convert("RGB").save(
        PUBLIC / "photography/join-summer-2b19a1fa.webp", quality=88, method=6
    )

report = []
for clip in ("scene-01.mp4", "scene-01-mobile.mp4", "pasture-film.mp4"):
    meta = iio.immeta(WORLD / clip, plugin="FFMPEG")
    report.append({"file": clip, "bytes": (WORLD / clip).stat().st_size,
                   "dimensions": meta["size"], "fps": meta["fps"],
                   "duration": meta["duration"]})
print(json.dumps(report, indent=2))
