#!/usr/bin/env python3
"""Gera os WAVs do corpus KBR com MeloTTS-Korean oficial.

Ambiente: .audio/venv (Python 3.10, melotts 0.1.2, CPU).
Modelo: myshell-ai/MeloTTS-Korean no commit fixado.
Encoder: kykim/bert-kor-base no commit fixado (licença não declarada).

Uso:
  .audio/venv/bin/python scripts/audio/generate-melotts.py
  .audio/venv/bin/python scripts/audio/generate-melotts.py --limit 1
  .audio/venv/bin/python scripts/audio/generate-melotts.py --force

Saída: .audio/raw/<chave>.wav
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUDIO_DIR = ROOT / ".audio"
INVENTORY = AUDIO_DIR / "inventory.json"
RAW_DIR = AUDIO_DIR / "raw"
MODELS_DIR = AUDIO_DIR / "models"
MELO_DIR = MODELS_DIR / "MeloTTS-Korean"
BERT_DIR = MODELS_DIR / "bert-kor-base"

MELO_REVISION = "0207e5adfc90129a51b6b03d89be6d84360ed323"
BERT_REVISION = "1779cc0982ada0216dd6de0dd4e86fb78201926d"
SPEAKER_ID = 0
SPEED = 1.0


def audio_key(text: str) -> str:
    """Mesmo FNV-1a de 32 bits de src/lib/audio/text.ts."""
    normalized = unicodedata.normalize("NFC", text).strip()
    value = 0x811C9DC5
    for byte in normalized.encode("utf-8"):
        value ^= byte
        value = (value * 0x01000193) & 0xFFFFFFFF
    return f"ko-{value:08x}"


def patch_bert_loading() -> None:
    """Impede que o MeloTTS baixe o BERT sem revisão fixada.

    `melo.text.korean` chama `AutoTokenizer.from_pretrained("kykim/bert-kor-base")`
    no import e `melo.text.japanese_bert` chama `AutoModelForMaskedLM` com o
    mesmo id. Redirecionamos os dois para a cópia local já baixada no commit
    fixado.
    """
    import transformers

    original_tokenizer = transformers.AutoTokenizer.from_pretrained
    original_model = transformers.AutoModelForMaskedLM.from_pretrained

    def tokenizer_from_pretrained(name, *args, **kwargs):
        if name == "kykim/bert-kor-base":
            name = str(BERT_DIR)
        return original_tokenizer(name, *args, **kwargs)

    def model_from_pretrained(name, *args, **kwargs):
        if name == "kykim/bert-kor-base":
            name = str(BERT_DIR)
        return original_model(name, *args, **kwargs)

    transformers.AutoTokenizer.from_pretrained = tokenizer_from_pretrained
    transformers.AutoModelForMaskedLM.from_pretrained = model_from_pretrained


def load_tts():
    patch_bert_loading()
    import torch
    from melo.api import TTS

    torch.set_num_threads(max(1, min(8, os.cpu_count() or 1)))
    torch.manual_seed(0)

    config_path = MELO_DIR / "config.json"
    checkpoint_path = MELO_DIR / "checkpoint.pth"
    if not config_path.is_file() or not checkpoint_path.is_file():
        raise SystemExit(
            "Modelo MeloTTS-Korean ausente. Baixe o commit fixado antes de gerar."
        )
    if not (BERT_DIR / "pytorch_model.bin").is_file():
        raise SystemExit(
            "Encoder BERT-Korean ausente. Baixe o commit fixado antes de gerar."
        )

    return TTS(
        language="KR",
        device="cpu",
        config_path=str(config_path),
        ckpt_path=str(checkpoint_path),
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--text", default=None, help="Gera apenas este texto.")
    args = parser.parse_args()

    if not INVENTORY.is_file():
        raise SystemExit(
            "Inventário ausente. Rode `node scripts/audio/build-inventory.mjs`."
        )

    payload = json.loads(INVENTORY.read_text(encoding="utf-8"))
    items = payload["items"]
    if args.text is not None:
        wanted = unicodedata.normalize("NFC", args.text).strip()
        items = [item for item in items if item["text"] == wanted]
        if not items:
            raise SystemExit(f"Texto fora do inventário: {args.text!r}")

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    pending = []
    for item in items:
        output = RAW_DIR / f"{audio_key(item['text'])}.wav"
        if not args.force and output.is_file() and output.stat().st_size > 1024:
            continue
        pending.append((item, output))

    if args.limit:
        pending = pending[: args.limit]

    if not pending:
        print("Nada a gerar; todos os WAVs já existem.")
        return 0

    print(f"Carregando MeloTTS-Korean ({len(pending)} clipes pendentes)…")
    started = time.time()
    tts = load_tts()
    print(f"Modelo carregado em {time.time() - started:.1f}s")

    failures = []
    for index, (item, output) in enumerate(pending, start=1):
        text = item["text"]
        print(f"[{index}/{len(pending)}] {item['key']} {text!r}", flush=True)
        clip_started = time.time()
        try:
            tts.tts_to_file(
                text,
                speaker_id=SPEAKER_ID,
                output_path=str(output),
                speed=SPEED,
                quiet=True,
            )
            if not output.is_file() or output.stat().st_size <= 1024:
                raise RuntimeError("WAV vazio ou truncado")
            print(f"    ok em {time.time() - clip_started:.1f}s", flush=True)
        except Exception as error:  # noqa: BLE001 - queremos registrar e continuar
            failures.append({"text": text, "key": item["key"], "error": repr(error)})
            print(f"    FALHOU: {error!r}", flush=True)
            if output.exists():
                output.unlink()

    if failures:
        failure_path = AUDIO_DIR / "generation-failures.json"
        failure_path.write_text(
            json.dumps(failures, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"{len(failures)} falha(s); detalhes em {failure_path}")
        return 1

    print(f"Concluído em {time.time() - started:.1f}s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
