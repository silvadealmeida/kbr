# KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷

**Learn Korean from scratch, with explanations designed for native Brazilian Portuguese speakers.**

KBR is a public Korean language learning project focused on accessible, structured and effective language education.

The goal is to combine contextual vocabulary learning, progressive dialogues, Hangul literacy and spaced repetition into a modern, mobile-first learning experience.

**Live website:** `[kbr-amber.vercel.app]`

**Status:** Complete for public release. The project owner has accepted production; no manual deploy is part of this close-out.

## Why KBR?

Most Korean learning platforms are designed around English-speaking learners.

KBR takes a different approach: teaching Korean directly through Brazilian Portuguese, with special attention to pronunciation, grammar differences and the challenges faced by Portuguese speakers.

### Learning approach

KBR draws inspiration from established language-learning methods:

- **Lingvist:** contextual vocabulary and sentence completion.
- **Assimil:** progressive dialogues and intuitive language acquisition.
- **Anki:** spaced repetition and long-term retention.
- **Duolingo:** short, interactive lessons with immediate feedback.

All course content and application code are independently developed.

## Available learning features

- Interactive Hangul alphabet and syllable formation
- Korean pronunciation and listening exercises
- Contextual vocabulary training
- Progressive Korean dialogues
- Grammar explanations in Brazilian Portuguese
- Spaced repetition and daily reviews
- Learning progress and performance tracking
- Google authentication and cloud synchronization

## Technology

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Framework      | Next.js / React              |
| Language       | TypeScript                   |
| Styling        | Tailwind CSS                 |
| Database       | Supabase PostgreSQL          |
| Authentication | Supabase Auth / Google OAuth |
| Testing        | Vitest / Playwright          |
| Hosting        | Vercel                       |
| Mobile         | Progressive Web App          |

## Release status

The completed product includes:

- Public, responsive mobile-first landing page
- Responsive mobile-first learning interface protected by Google sign-in
- Installable PWA configuration (without offline support)
- Core Hangul utilities
- Exercise validation
- Leitner spaced repetition engine
- Local progress persistence
- Google OAuth and cloud synchronization code
- Public privacy policy (`/privacidade`) and legal notice (`/impressum`)

The audio corpus is **resolved with credits**: 7,790 MeloTTS-Korean MP3 cover Hangul, A1, A2, B1, B2, C1, C2 and vocabulary and are served by default. `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` is only a kill switch. Credits for MeloTTS, MeloTTS-Korean, `kykim/bert-kor-base`/LMkor and FFmpeg/libmp3lame are published in `/impressum` and `docs/audio/credits.md`.

The final editorial review was AI-assisted and accepted by the project owner; no native-speaker review is claimed. The content remains labeled `in-review`, and residual quality risks are accepted and are not release blockers. Privacy and legal pages describe the product's operational policy without claiming a professional legal opinion or inventing personal details. The only published contact route is the public project repository; it is not a private channel for sensitive information.

Physical-device testing was not performed and is not required for this close-out. The automated browser matrix and its intentional skips are recorded in [`docs/release/beta-readiness.md`](docs/release/beta-readiness.md).

See [Development Roadmap](docs/roadmap.md) for detailed progress.

## Running locally

Clone the repository:

```bash
git clone https://github.com/silvadealmeida/kbr.git
cd kbr
npm install
```

Create `.env.local` with your own Supabase project credentials:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

Run validation:

```bash
npm run typecheck
npm test
npm run build
```

For cloud authentication setup, see [Supabase Setup](docs/supabase-setup.md).

## Project documentation

- [Research and Pedagogy](docs/research.md)
- [System Architecture](docs/architecture.md)
- [Development Roadmap](docs/roadmap.md)
- [Supabase and Google OAuth Setup](docs/supabase-setup.md)
- [Safe CAS Deployment and Real-Device Validation Runbook](docs/sync/deployment-runbook.md)
- [Privacy and Legal Audit](docs/privacy-audit.md)
- [Release Readiness](docs/release/beta-readiness.md)
- [Audio Credits](docs/audio/credits.md)
- [Final Editorial Review](docs/audits/release-final-review.md)

## Project philosophy

KBR aims to make Korean learning accessible through clear explanations, contextual practice and long-term memory techniques.

The project prioritizes educational quality, privacy, accessible design and low-cost infrastructure.

## License

License not yet specified. Public source availability does not automatically grant permission for reuse or redistribution.
