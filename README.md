# AI Music Studio — Audio to MIDI & Yamaha Style Converter

Web application for converting audio songs into multi-track MIDI arrangements using AI, editing them with an in-browser Piano Roll editor, and exporting them as authentic Yamaha Style Files (`.STY`) for arranger keyboards (specifically targeted for Yamaha PSR-S970, PSR-SX, and Genos series).

---

## 📑 Project Specification & Prompt

The full detailed project prompt and technical specification is available in:
👉 **[`PROJECT_PROMPT.md`](./PROJECT_PROMPT.md)**

---

## 🚀 Key Features

1. **Audio to MIDI Converter**:
   - Upload MP3, WAV, FLAC, OGG with waveform preview and playback.
   - AI instrument separation (Drums, Bass, Piano, Guitar, Brass, Strings, Lead Melody, Synth Pad).
   - Note, pitch, tempo (BPM), key signature, and chord progression detection.

2. **MIDI Piano Roll Editor**:
   - Interactive multi-track note editing, quantizing, velocity control, grid snapping, and Tone.js playback.
   - Real Standard MIDI File (SMF Type 0 / Type 1) export.

3. **MIDI to Yamaha Style Converter (`.STY`)**:
   - Section builder: Intro (A-C), Main (A-D), Fill-in (A-D, Break), Ending (A-C).
   - Yamaha style channels (9: Rhythm 1, 10: Rhythm 2, 11: Bass, 12: Chord 1, 13: Chord 2, 14: Pad, 15: Phrase 1, 16: Phrase 2).
   - Yamaha STY chunk formatting (`CASM`, `CSEG`, `CVO`) with strict validation.

4. **Multi-Platform Access**:
   - Desktop & Mobile Web Browsers.
   - Progressive Web App (PWA).
   - Telegram Mini App & Telegram Bot notification integration.

5. **Authentication & Storage**:
   - Google OAuth & Telegram Login.
   - PostgreSQL (User, Project, and Track metadata).
   - Redis & BullMQ worker queue for AI and STY conversion tasks.

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Motion, Tone.js, WaveSurfer.js.
- **Backend**: Node.js, Next.js Server Actions / Route Handlers, Redis, BullMQ background workers.
- **Database**: PostgreSQL (Prisma / Drizzle ORM).
- **Integrations**: Telegram Mini Apps SDK, Telegram Bot API, Google OAuth.
