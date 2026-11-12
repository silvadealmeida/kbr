#!/usr/bin/env python3
"""Normaliza, corta e codifica os WAVs do MeloTTS em MP3 estáticos.

Uso:
  .audio/venv/bin/python scripts/audio/encode-audio.py

Entrada:  .audio/inventory.json + .audio/raw/<chave>.wav
Saída:    public/audio/v1/<chave>.mp3
          src/content/audio/entries.ts
          src/content/audio/manifest.json
          .audio/encode-report.json

O processamento é determinístico: mesmo WAV de entrada e mesmos parâmetros
produzem o mesmo MP3 (o encoder LAME é determinístico para a mesma versão).
"""
from __future__ import annotations

import hashlib
import json
import math
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[2]
AUDIO_DIR = ROOT / ".audio"
RAW_DIR = AUDIO_DIR / "raw"
WORK_DIR = AUDIO_DIR / "encoded"
PUBLIC_DIR = ROOT / "public" / "audio" / "v1"
ENTRIES_FILE = ROOT / "src" / "content" / "audio" / "entries.ts"
MANIFEST_FILE = ROOT / "src" / "content" / "audio" / "manifest.json"
REPORT_FILE = AUDIO_DIR / "encode-report.json"

TARGET_RMS_DB = -18.0
MAX_PEAK_DB = -1.0
MAX_GAIN_DB = 12.0
TRIM_START_MS = 40
TRIM_END_MS = 80
FADE_IN_MS = 5
FADE_OUT_MS = 20
THRESHOLD_DB = -45.0
MP3_BITRATE = "64k"
SAMPLE_RATE = 44100
CHANNELS = 1
VERSION = 1
MODEL = {
    "name": "MeloTTS-Korean",
    "repo": "myshell-ai/MeloTTS-Korean",
    "revision": "0207e5adfc90129a51b6b03d89be6d84360ed323",
    "speaker": "KR",
    "speed": 1.0,
    "encoder": {
        "repo": "kykim/bert-kor-base",
        "revision": "1779cc0982ada0216dd6de0dd4e86fb78201926d",
        "license": "não declarada no repositório",
    },
}


def audio_key(text: str) -> str:
    normalized = unicodedata.normalize("NFC", text).strip()
    value = 0x811C9DC5
    for byte in normalized.encode("utf-8"):
        value ^= byte
        value = (value * 0x01000193) & 0xFFFFFFFF
    return f"ko-{value:08x}"


def db(value: float) -> float:
    return 20.0 * math.log10(max(value, 1e-12))


def trim_and_normalize(samples: np.ndarray, sample_rate: int) -> tuple[np.ndarray, dict]:
    if samples.ndim > 1:
        samples = samples.mean(axis=1)
    samples = samples.astype(np.float64, copy=False)

    threshold = 10.0 ** (THRESHOLD_DB / 20.0)
    voiced = np.flatnonzero(np.abs(samples) > threshold)
    if voiced.size == 0:
        raise ValueError("WAV sem trecho acima do limiar de silêncio")

    start = max(0, int(voiced[0]) - int(sample_rate * TRIM_START_MS / 1000))
    end = min(
        len(samples),
        int(voiced[-1]) + 1 + int(sample_rate * TRIM_END_MS / 1000),
    )
    clipped = samples[start:end].copy()

    rms_before = float(np.sqrt(np.mean(np.square(clipped))))
    peak_before = float(np.max(np.abs(clipped)))
    gain = min(
        TARGET_RMS_DB - db(rms_before),
        MAX_PEAK_DB - db(peak_before),
        MAX_GAIN_DB,
    )
    clipped *= 10.0 ** (gain / 20.0)

    fade_in = min(len(clipped), int(sample_rate * FADE_IN_MS / 1000))
    fade_out = min(len(clipped), int(sample_rate * FADE_OUT_MS / 1000))
    if fade_in:
        clipped[:fade_in] *= np.linspace(0.0, 1.0, fade_in, endpoint=False)
    if fade_out:
        clipped[-fade_out:] *= np.linspace(1.0, 0.0, fade_out, endpoint=False)

    rms_after = float(np.sqrt(np.mean(np.square(clipped))))
    peak_after = float(np.max(np.abs(clipped)))
    if peak_after > 10.0 ** (-0.5 / 20.0):
        raise ValueError(f"Pico acima de -0,5 dBFS: {db(peak_after):.2f}")

    return clipped, {
        "trimStartMs": round(start / sample_rate * 1000, 1),
        "trimEndMs": round((len(samples) - end) / sample_rate * 1000, 1),
        "durationSeconds": round(len(clipped) / sample_rate, 3),
        "rmsBeforeDb": round(db(rms_before), 2),
        "peakBeforeDb": round(db(peak_before), 2),
        "gainDb": round(gain, 2),
        "rmsDb": round(db(rms_after), 2),
        "peakDb": round(db(peak_after), 2),
    }


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return round(float(result.stdout.strip()), 3)


def encode_mp3(wav_path: Path, mp3_path: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(wav_path),
            "-codec:a",
            "libmp3lame",
            "-b:a",
            MP3_BITRATE,
            "-ar",
            str(SAMPLE_RATE),
            "-ac",
            str(CHANNELS),
            "-map_metadata",
            "-1",
            "-fflags",
            "+bitexact",
            "-flags:a",
            "+bitexact",
            str(mp3_path),
        ],
        check=True,
        capture_output=True,
    )


def main() -> int:
    if not (AUDIO_DIR / "inventory.json").is_file():
        raise SystemExit(
            "Inventário ausente. Rode `node scripts/audio/build-inventory.mjs`."
        )

    payload = json.loads((AUDIO_DIR / "inventory.json").read_text(encoding="utf-8"))
    items = payload["items"]

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    ENTRIES_FILE.parent.mkdir(parents=True, exist_ok=True)

    missing = [
        item["key"]
        for item in items
        if not (RAW_DIR / f"{item['key']}.wav").is_file()
    ]
    if missing:
        raise SystemExit(f"WAVs ausentes: {', '.join(missing[:10])}")

    manifest_items = []
    entries = {}
    duplicates: dict[str, str] = {}
    warnings: list[str] = []

    for index, item in enumerate(items, start=1):
        key = audio_key(item["text"])
        if key != item["key"]:
            raise SystemExit(f"Chave divergente para {item['text']!r}: {key} != {item['key']}")

        raw_path = RAW_DIR / f"{key}.wav"
        samples, sample_rate = sf.read(raw_path, always_2d=False)
        if sample_rate != SAMPLE_RATE:
            raise SystemExit(f"Taxa inesperada em {raw_path}: {sample_rate}")

        processed, stats = trim_and_normalize(samples, sample_rate)
        if stats["durationSeconds"] < 0.12:
            warnings.append(f"{key} {item['text']!r}: curto demais ({stats['durationSeconds']}s)")
        if stats["durationSeconds"] > 6:
            warnings.append(f"{key} {item['text']!r}: longo demais ({stats['durationSeconds']}s)")

        work_path = WORK_DIR / f"{key}.wav"
        sf.write(work_path, processed, SAMPLE_RATE, subtype="PCM_16")

        mp3_path = PUBLIC_DIR / f"{key}.mp3"
        encode_mp3(work_path, mp3_path)
        if not mp3_path.is_file() or mp3_path.stat().st_size <= 0:
            raise SystemExit(f"MP3 vazio: {mp3_path}")

        digest = sha256(mp3_path)
        if digest in duplicates and duplicates[digest] != item["text"]:
            warnings.append(
                f"MP3 idêntico para {duplicates[digest]!r} e {item['text']!r}"
            )
        duplicates[digest] = item["text"]

        duration = probe_duration(mp3_path)
        entries[item["text"]] = f"/audio/v1/{key}.mp3"
        manifest_items.append(
            {
                "text": item["text"],
                "key": key,
                "src": f"/audio/v1/{key}.mp3",
                "sha256": digest,
                "bytes": mp3_path.stat().st_size,
                "durationSeconds": duration,
                "sampleRate": SAMPLE_RATE,
                "channels": CHANNELS,
                "bitrateKbps": 64,
                **stats,
                "sources": item["sources"],
                "steps": item["steps"],
                "tags": item["tags"],
                "priority": item["priority"],
            }
        )
        print(f"[{index}/{len(items)}] {key} {item['text']!r} {duration:.2f}s", flush=True)

    manifest = {
        "version": VERSION,
        "generator": "scripts/audio/encode-audio.py",
        "model": MODEL,
        "encoding": {
            "format": "mp3",
            "codec": "libmp3lame",
            "bitrateKbps": 64,
            "sampleRate": SAMPLE_RATE,
            "channels": CHANNELS,
            "targetRmsDb": TARGET_RMS_DB,
            "maxPeakDb": MAX_PEAK_DB,
            "trimStartMs": TRIM_START_MS,
            "trimEndMs": TRIM_END_MS,
        },
        "count": len(manifest_items),
        "totalBytes": sum(item["bytes"] for item in manifest_items),
        "totalDurationSeconds": round(
            sum(item["durationSeconds"] for item in manifest_items), 3
        ),
        "items": manifest_items,
    }

    MANIFEST_FILE.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    lines = [
        "// Gerado por scripts/audio/encode-audio.py. Não edite manualmente.",
        "// Mapa compacto texto (NFC) → caminho do MP3. O manifesto completo fica em",
        "// src/content/audio/manifest.json e não entra no bundle do cliente.",
        "export const AUDIO_ENTRIES: Readonly<Record<string, string>> = {",
    ]
    for text in sorted(entries):
        lines.append(f"  {json.dumps(text, ensure_ascii=False)}: {json.dumps(entries[text])},")
    lines.append("};")
    lines.append("")
    ENTRIES_FILE.write_text("\n".join(lines), encoding="utf-8")

    expected = {f"{item['key']}.mp3" for item in items}
    removed = []
    for path in sorted(PUBLIC_DIR.glob("*.mp3")):
        if path.name not in expected:
            path.unlink()
            removed.append(path.name)

    report = {
        "count": len(manifest_items),
        "totalBytes": manifest["totalBytes"],
        "totalDurationSeconds": manifest["totalDurationSeconds"],
        "warnings": warnings,
        "pruned": removed,
    }
    REPORT_FILE.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(
        json.dumps(
            {
                "count": report["count"],
                "totalBytes": report["totalBytes"],
                "totalDurationSeconds": report["totalDurationSeconds"],
                "warnings": warnings,
                "pruned": removed,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
