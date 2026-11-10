# KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷

**Learn Korean from scratch, with explanations designed for native Brazilian Portuguese speakers.**

KBR is an open-source Korean language learning project focused on accessible, structured and effective language education.

The goal is to combine contextual vocabulary learning, progressive dialogues, Hangul literacy and spaced repetition into a modern, mobile-first learning experience.

**Live website:** `[Add Vercel production URL]`

**Status:** Early development — not yet a complete Korean course.

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

## Planned learning features

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

## Development status

The current development foundation includes:

- Responsive mobile-first interface
- Initial PWA configuration
- Core Hangul utilities
- Exercise validation
- Leitner spaced repetition engine
- Local progress persistence
- Google OAuth and cloud synchronization code

The cloud integration still requires external configuration and end-to-end validation.

The interactive learning content is under development.

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

## Project philosophy

KBR aims to make Korean learning accessible through clear explanations, contextual practice and long-term memory techniques.

The project prioritizes educational quality, privacy, accessible design and low-cost infrastructure.

## License

License not yet specified. Public source availability does not automatically grant permission for reuse or redistribution.