# AI Music Studio -- Audio to MIDI & Yamaha Style Converter

## 1. Project Overview

បង្កើត Web Application ឈ្មោះ **AI Music Studio** ដែលរួមបញ្ចូលមុខងារបម្លែងចម្រៀងទៅជា MIDI ដោយប្រើ AI និងបម្លែង MIDI ទៅជា Yamaha Style File (`.STY`) សម្រាប់ Yamaha arranger keyboards ជាពិសេស Yamaha PSR-S970។

ប្រព័ន្ធអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់៖

- Upload ចម្រៀង MP3, WAV, FLAC និង Audio Formats ផ្សេងៗ។
- វិភាគចម្រៀង និងបំបែកឧបករណ៍តន្ត្រីដោយ AI។
- បង្កើត Multi-Track MIDI ដែលអាចកែសម្រួលបាន។
- កែសម្រួល Notes តាម MIDI Piano Roll Editor។
- បម្លែង MIDI ទៅជា Yamaha Style File (`.STY`)។
- បង្កើត Style Sections ដូចជា Intro, Main, Fill In, Break និង Ending។
- Preview និង Export MIDI / STY Files។
- ប្រើឯកសារដែលបានបង្កើតជាមួយ Yamaha PSR-S970 ប្រសិនបើ Format ត្រូវបានគាំទ្រ។

---

## 2. Complete Workflow

```text
Upload Audio (MP3 / WAV / FLAC)
             |
             v
       AI Music Analysis
             |
             v
     Instrument Separation
             |
             v
    Multi-Track MIDI Generation
             |
             v
       MIDI Piano Roll Editor
             |
       +-----+------+
       |            |
       v            v
   Export MIDI   MIDI to STY
                    |
                    v
             Track Analysis
                    |
                    v
          Instrument Assignment
                    |
                    v
            Style Section Builder
                    |
                    v
             Yamaha STY Validation
                    |
                    v
              Export STY File
                    |
                    v
              Yamaha Keyboard
```

---

## 3. Main Navigation

បង្កើត Sidebar Navigation ដែលមាន៖

1. **Dashboard**
2. **Audio to MIDI**
3. **Instrument Separation**
4. **MIDI Editor**
5. **MIDI to STY**
6. **Style Creator**
7. **Style Library**
8. **Settings**

---

## 4. Audio to MIDI Converter

### 4.1 Audio Upload

**គាំទ្រ៖**
- MP3
- WAV
- FLAC
- OGG
- ទម្រង់ Audio ផ្សេងៗដែល Browser និង Processing Backend គាំទ្រ។

**មុខងារ៖**
- Drag & Drop និង Browse File។
- បង្ហាញ File Name, File Size, Duration និង Format។
- Audio Preview៖ Play, Pause, Stop និង Seek។
- Audio Waveform។
- Upload Progress និង Analysis Progress។
- Replace និង Remove Audio File។

### 4.2 AI Music Analysis

AI ត្រូវវិភាគ និងសម្គាល់ឧបករណ៍តន្ត្រី៖

| ប្រភេទ | ឧបករណ៍ |
| :--- | :--- |
| **Drums & Percussion** | Kick, Snare, Hi-Hat, Cymbal, Percussion |
| **Bass** | Electric Bass, Acoustic Bass, Synth Bass |
| **Piano** | Grand Piano, Electric Piano |
| **Guitar** | Acoustic Guitar, Electric Guitar, Rhythm Guitar, Lead Guitar |
| **Brass** | Trumpet, Saxophone, Trombone |
| **Strings** | Violin, Viola, Cello, String Ensemble |
| **Synthesizer** | Synth Pad, Lead Synth, Synth Bass |
| **Keyboard** | Organ, Electric Piano |
| **Wind** | Flute, Clarinet |
| **Vocal** | Vocal Melody, Choir |
| **Other** | Other Musical Instruments |

**AI ត្រូវ Detect៖**
- Musical Notes និង Pitch
- Tempo (BPM)
- Time Signature
- Key Signature
- Chords និង Chord Progression
- Instrument Types
- Note Duration
- Velocity
- Musical Timing

### 4.3 Instrument Separation

បំបែកឧបករណ៍តន្ត្រីទៅជា MIDI Tracks ដាច់ដោយឡែក៖

| Track # | Instrument |
| :--- | :--- |
| **1** | Drums |
| **2** | Bass |
| **3** | Piano |
| **4** | Acoustic Guitar |
| **5** | Brass |
| **6** | Strings |
| **7** | Lead Melody |
| **8** | Synth Pad |

**អ្នកប្រើប្រាស់អាច៖**
- Enable / Disable Track
- Solo / Mute Track
- Rename Track
- Change Instrument Assignment
- Adjust Volume និង Velocity
- Edit និង Delete MIDI Notes
- Add New Track

---

## 5. MIDI Piano Roll Editor

បង្កើត Piano Roll Editor ដែលមានមុខងារ៖
- បង្ហាញ MIDI Notes តាម Pitch និង Timing។
- Add, Delete, Move និង Resize Notes។
- កែសម្រួល Pitch និង Note Duration។
- Adjust Velocity។
- Zoom In / Zoom Out។
- Change Grid Resolution។
- Quantization។
- Timeline ជា Bars និង Beats។
- Velocity Editor។
- MIDI Playback និង Track Selection។

---

## 6. MIDI Export

**អនុញ្ញាតឱ្យ Export៖**
1. Complete Multi-Track MIDI File
2. Individual Instrument MIDI Files
3. Drum MIDI
4. Bass MIDI
5. Piano MIDI
6. Brass MIDI
7. Strings MIDI
8. Lead Melody MIDI

**គាំទ្រ៖**
- MIDI Type 0 (Single Track)
- MIDI Type 1 (Multi-Track)

MIDI File ត្រូវរក្សាទុក Tempo, Time Signature, Track Names, Instrument Assignments, Note Events, Note Durations និង Velocity។

---

## 7. Yamaha Keyboard Compatibility

Optimize MIDI Export សម្រាប់ Yamaha keyboards ជាពិសេស Yamaha PSR-S970។

**មុខងារ៖**
- General MIDI Instrument Mapping
- Yamaha-compatible MIDI Export
- Drum Channel Configuration
- Adjustable Tempo
- Separate Accompaniment Tracks
- MIDI Type 1 Export
- Keyboard Compatibility Information

> [!NOTE]
> **ចំណាំ៖** MIDI File រក្សាទុក Musical Events ដូចជា Notes, Timing, Velocity និង Program Changes ប៉ុន្តែមិនរក្សាទុក Original Instrument Samples ឬ Yamaha Voice Data ទេ។

---

## 8. MIDI to Yamaha Style Converter (.STY)

បង្កើតមុខងារ **MIDI to Yamaha Style Converter** ដើម្បីបម្លែង Standard MIDI File ទៅជា Yamaha Style File ដែលមាន Format ត្រឹមត្រូវ។

### 8.1 MIDI Upload

**គាំទ្រ៖**
- MIDI Type 0
- MIDI Type 1
- Multi-Track MIDI
- Drag & Drop Upload
- MIDI Preview
- Track Analysis
- Tempo Detection
- Time Signature Detection
- Chord Progression Detection

**បង្ហាញ៖**
- File Name
- Number of Tracks
- Tempo (BPM)
- Time Signature
- Key Signature ប្រសិនបើមានក្នុង File
- Track Names
- Instrument Assignments
- Number of Bars

### 8.2 MIDI Track Analysis

វិភាគ MIDI Tracks និងណែនាំ Yamaha Style Part ដូចខាងក្រោម៖

| MIDI Track | Yamaha Style Part |
| :--- | :--- |
| **Drums** | Rhythm 1 |
| **Additional Drums** | Rhythm 2 |
| **Bass** | Bass |
| **Piano** | Chord 1 |
| **Guitar** | Chord 2 |
| **Strings** | Pad |
| **Brass** | Phrase 1 |
| **Lead Melody** | Phrase 2 |

អនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ផ្លាស់ប្តូរ Assignment ដោយដៃ។

**Track នីមួយៗត្រូវមាន៖**
- Track Name
- Instrument
- MIDI Channel
- Volume
- Pan
- Mute / Solo
- Enable / Disable

### 8.3 Yamaha Style Section Builder

**គាំទ្រ Style Sections៖**
- **Main Sections:** Main A, Main B, Main C, Main D
- **Intro Sections:** Intro A, Intro B, Intro C
- **Ending Sections:** Ending A, Ending B, Ending C
- **Fill Sections:** Fill In A, Fill In B, Fill In C, Fill In D, Break

**មុខងារ៖**
- Select MIDI Bars សម្រាប់ Section នីមួយៗ។
- Copy / Paste Sections។
- Duplicate Sections។
- Set Number of Bars។
- Preview Sections។
- Configure Transitions។
- Assign Instruments។
- បង្កើត Basic Style ទោះបី MIDI ដើមមិនមានគ្រប់ Sections ក៏ដោយ។

### 8.4 Yamaha Style Channel Configuration

Default Channel Mapping៖

| Style Part | Default MIDI Channel |
| :--- | :---: |
| **Rhythm 1** | 9 |
| **Rhythm 2** | 10 |
| **Bass** | 11 |
| **Chord 1** | 12 |
| **Chord 2** | 13 |
| **Pad** | 14 |
| **Phrase 1** | 15 |
| **Phrase 2** | 16 |

អនុញ្ញាតឱ្យកែសម្រួល Channel ដោយដៃ។ ត្រូវ Validate Channel Mapping និងគោរពតាមតម្រូវការរបស់ Yamaha Style Format ដែលបានជ្រើសរើស។

### 8.5 Style Settings

បង្កើត Settings សម្រាប់៖
- Style Name
- Tempo (BPM)
- Time Signature
- Style Volume
- Intro Length
- Main Section Length
- Fill In Length
- Ending Length
- Chord Recognition Mode
- Instrument Assignment
- Drum Kit Selection
- Bass Voice Selection
- Chord Voice Selection
- Phrase Voice Selection

### 8.6 Yamaha STY Export

Export ជា Yamaha Style File (`.STY`) ដែលមាន Structure ត្រឹមត្រូវ។

**គោលដៅ Compatibility៖**
- Yamaha PSR-S970
- Yamaha PSR-SX Series
- Yamaha Genos Series
- Generic Yamaha Style Format

**ត្រូវរក្សាទុក៖**
- MIDI Note Events
- Instrument Assignments
- Tempo និង Timing
- Accompaniment Sections
- Style Channel Assignments
- Style Metadata

> [!IMPORTANT]
> **សំខាន់៖** Yamaha Style Files មាន Internal Structure ពិសេស (MIDI Container, CASM chunk, CSEG chunk, CVO chunk, etc.)។ ត្រូវប្រើ Yamaha-compatible STY Writer ពិតប្រាកដ។ មិនត្រូវគ្រាន់តែប្តូរឈ្មោះ `.MID` ទៅជា `.STY` ឡើយ។
> 
> ប្រសិនបើ STY Writer មិនទាន់បានអនុវត្ត ត្រូវបង្ហាញ៖
> > *Yamaha STY export is not available because the required Style File structure has not been implemented.*
> 
> មិនត្រូវបង្កើត Fake STY File ឬបង្ហាញថា Export ជោគជ័យឡើយ។

---

## 9. Style Creator

បង្កើត Style Creator ដែលអាច៖
- Create Style from MIDI
- Select MIDI Bars
- Detect Chords
- Edit Chord Progression
- Transpose Chords
- Create Main A--D
- Create Intro A--C
- Create Ending A--C
- Create Fill In A--D
- Create Break
- Preview Style
- Edit Style Sections
- Export STY

### Chord Detection
វិភាគ MIDI Notes ដើម្បីសម្គាល់ Chord Progressions ឧទាហរណ៍៖
```text
C → Am → F → G
```
អនុញ្ញាតឱ្យអ្នកប្រើប្រាស់កែសម្រួល Chords និង Transpose ទៅ Key ផ្សេងៗ។

---

## 10. Style Library

បង្កើត Library សម្រាប់គ្រប់គ្រង Yamaha Style Files៖
- Upload STY File
- Download STY File
- Rename Style
- Delete Style
- Preview Style
- Search Style
- Filter by Category
- Display Style Name
- Display Tempo
- Display Time Signature
- Display Compatible Keyboard

---

## 11. Advanced Music Settings

### AI Analysis Settings

| Setting | Options |
| :--- | :--- |
| **Analysis Quality** | Fast / Balanced / High Quality |
| **Note Detection Sensitivity** | Adjustable slider |
| **Instrument Separation Strength** | Adjustable slider |
| **Pitch Correction** | On / Off |
| **Quantization** | Off / 1/4 / 1/8 / 1/16 / 1/32 |
| **Tempo Detection** | On / Off |
| **Key Detection** | On / Off |
| **Chord Detection** | On / Off |
| **Remove Background Noise** | On / Off |
| **Detect Melody** | On / Off |
| **Detect Accompaniment** | On / Off |
| **Separate Vocals** | On / Off |
| **Separate Drums** | On / Off |
| **Separate Bass** | On / Off |
| **Separate Harmonic Instruments** | On / Off |

### Yamaha Export Settings

- Keyboard Model
- MIDI Type
- Drum Channel
- Style Channel Mapping
- Tempo
- Transpose
- Chord Mode
- Style Resolution

---

## 12. Project Management

**អ្នកប្រើប្រាស់អាច៖**
- Create New Project
- Save Project
- Rename Project
- Reopen Project
- Download Project File
- Export MIDI
- Export STY
- Export Analysis Report

**Project File គួររក្សាទុក៖**
- Original Audio File Reference
- MIDI Tracks
- Instrument Assignments
- MIDI Notes
- Tempo
- Key Signature
- Time Signature
- Style Sections
- Yamaha Style Settings

---

## 13. User Interface Design

បង្កើត Professional Music Production Dashboard។

### Design Style
- **Theme:** Dark Theme
- **Color Palette:** Black និង Dark Gray Background, Purple និង Blue Accent Colors
- **Vibe:** Professional Music Studio Appearance
- **Typography:** Clean, Modern Typography
- **Layout:** Responsive Layout (Desktop, Tablet, Mobile)
- **Interactions:** Smooth Interactions, Modern Cards and Panels

### Dashboard Layout
1. Header ដែលមាន Logo និង Project Name
2. Audio Upload Section
3. Audio Waveform និង Playback Controls
4. AI Analysis Status និង Progress
5. Instrument Separation Panel
6. Multi-Track MIDI Editor
7. MIDI to STY Converter
8. Style Section Builder
9. Yamaha Style Settings
10. Export Panel

---

## 14. Technology Stack and System Architecture

Build the platform using a modern full-stack TypeScript/JavaScript architecture. The application must support desktop browsers, mobile browsers, Progressive Web App (PWA) installation, and Telegram Mini App access.

### 14.1 Frontend

| Technology | Purpose |
| :--- | :--- |
| **React.js** | Component-based user interface |
| **Next.js** | React framework, App Router, server rendering, API structure |
| **TypeScript** | Type safety and maintainable code |
| **Tailwind CSS** | Responsive utility-first styling |
| **shadcn/ui** | Reusable and customizable application components |
| **Radix UI / Base UI** | Accessible headless UI primitives |
| **Motion** | React interface animations and transitions |
| **GSAP** | Advanced timelines and complex interface animations |

**Implementation guidance:**
- Use Next.js App Router.
- Use React components and reusable feature modules.
- Use Tailwind CSS for layout, responsive design, themes, and styling.
- Use shadcn/ui as the primary component system.
- Choose either Radix UI or Base UI as the underlying headless primitive approach for each component set. Do not combine competing primitives for the same component without a clear reason.
- Use Motion for common UI transitions and interactions.
- Use GSAP only for advanced timeline-based animations where it adds value.
- Build a responsive dark music-production interface for desktop, tablet, and mobile.
- Keep audio processing and large editor interactions efficient; avoid unnecessary component re-rendering.

**Official documentation:**
- React: [https://react.dev/](https://react.dev/)
- Next.js: [https://nextjs.org/docs](https://nextjs.org/docs)
- Radix UI: [https://www.radix-ui.com/](https://www.radix-ui.com/)
- shadcn/ui: [https://ui.shadcn.com/](https://ui.shadcn.com/)
- Base UI: [https://base-ui.com/](https://base-ui.com/)
- Tailwind CSS: [https://tailwindcss.com/](https://tailwindcss.com/)
- Motion: [https://motion.dev/](https://motion.dev/)
- GSAP: [https://gsap.com/](https://gsap.com/)

### 14.2 Backend

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Backend runtime |
| **Next.js Route Handlers / Server Actions** | Application APIs and server-side operations |
| **Node.js Worker Service** | Long-running audio analysis, transcription, and conversion jobs |
| **Redis** | Caching, job queues (e.g. BullMQ), temporary state, and rate limiting |

**Backend requirements:**
- Provide authenticated APIs for projects, uploads, MIDI files, Style files, and user settings.
- Use background jobs for long-running AI audio analysis and file conversion.
- Return job IDs and processing states such as `queued`, `processing`, `completed`, and `failed`.
- Provide progress updates through polling, Server-Sent Events (SSE), or WebSockets.
- Store uploaded files and generated artifacts in suitable file/object storage (e.g., S3/MinIO); do not use Redis as permanent file storage.
- Use Redis for caching, job coordination, temporary data, and queue management.
- Validate uploaded file types, sizes, and content on the server.
- Enforce authorization so users can access only their own projects and files.
- Keep secrets and API credentials on the server, never in frontend code.

### 14.3 Database

Use **PostgreSQL** as the primary database.

**Database requirements:**
- Store user accounts and authentication identities.
- Store projects and project settings.
- Store audio file metadata and storage references.
- Store MIDI track metadata and instrument assignments.
- Store Style projects, sections, and channel mappings.
- Store conversion job records and processing status.
- Store export history and validation reports.
- Use migrations and database constraints (Prisma or Drizzle ORM).
- Add indexes for common searches and user/project lookups.
- Store large audio, MIDI, and STY file contents in file/object storage rather than directly in ordinary database rows.

### 14.4 Login and Authentication

**Sign-in methods:**
1. **Google Login** using Google OAuth / OpenID Connect.
2. **Telegram Login** using Telegram's supported authentication flow.
3. **Telegram Mini App authentication** when the application is opened inside Telegram.

**Authentication requirements:**
- Provide Login and Logout.
- Link Google and Telegram identities to the same application account where the user explicitly approves account linking.
- Verify OAuth tokens and Telegram authentication data on the backend.
- For Telegram Mini Apps, validate Telegram `initData` on the server using Telegram's documented HMAC-SHA256 verification process. Do not trust user identity values supplied directly by the browser.
- Use secure, HTTP-only cookies for web sessions.
- Apply CSRF protection where required.
- Support account linking, session expiry, and logout from active sessions.
- Never store passwords or authentication secrets in frontend JavaScript.

### 14.5 Telegram Bot Integration

Create a Telegram Bot that connects users to AI Music Studio.

**Features:**
- `/start` to introduce the service.
- Open the AI Music Studio Telegram Mini App.
- Notify users when audio analysis is completed or fails.
- Notify users when MIDI or STY export is ready.
- Provide project status and links to generated files, subject to access permissions.
- Allow users to receive important processing notifications.

**Bot requirements:**
- Keep the bot token in backend environment variables or a secret manager.
- Verify webhook requests where applicable.
- Validate that users are authorized to access project and download links.
- Do not send private files or project details to an unverified Telegram account.

### 14.6 Telegram Mini App

Provide a Telegram Mini App version of the platform.

**Requirements:**
- Launch from the Telegram Bot's menu button or a supported Mini App link.
- Integrate the Telegram Mini Apps JavaScript SDK (`@telegram-apps/sdk`).
- Read Telegram Mini App context on the client, but verify `initData` on the backend.
- Support Telegram theme parameters and mobile-friendly layouts.
- Provide access to Dashboard, Projects, conversion status, and file downloads.
- Allow users to open the full web application when they need advanced editing features.
- Handle Telegram's viewport, back button, and safe-area behavior.
- Provide graceful fallbacks if specific desktop audio editor features are constrained in Telegram's webview.

### 14.7 Progressive Web App (PWA)

Make the web application installable as a PWA.

**Requirements:**
- Web App Manifest (`manifest.json`) with application name, icons, theme color, and display mode.
- Service Worker for caching app shell and static assets.
- Install prompt experience on supported browsers.
- Responsive layouts for mobile and desktop.
- Offline access to the application shell and previously cached non-sensitive resources.
- Show clear connection status when network access is unavailable.
- Do not claim that AI conversion runs offline unless an offline-capable model is explicitly loaded.
- Do not cache private audio, MIDI, or STY files in shared public caches.

### 14.8 Music Processing Libraries and Services

| Library / Service | Purpose |
| :--- | :--- |
| **Tone.js** | Audio playback, synthesizers, and Web Audio API interaction |
| **WaveSurfer.js** | Interactive audio waveform rendering and region selection |
| **@tonejs/midi** | MIDI file creation, parsing, and editing support |
| **MIDI Parsing Library** | Low-level MIDI event stream parsing and manipulation |
| **AI Transcription Model / Service** | Audio-to-MIDI transcription (e.g. Basic Pitch, MT3, Omnizart) |
| **Audio Source Separation Service** | Spleeter / Demucs / HTDemucs stem separation (Drums, Bass, Other, Vocals) |
| **Instrument Recognition Service** | Instrument classification / family detection |
| **Yamaha-compatible STY Writer** | Binary structure generator for Yamaha Style files (`CASM`, `CSEG`, `CVO`) |

> [!NOTE]
> Frontend libraries handle UI and playback. AI audio transcription, stem separation, and Yamaha STY binary generation require dedicated backend services.

### 14.9 Suggested Application Architecture

```text
Web Browser / Installed PWA / Telegram Mini App
                     |
                     v
             Next.js + React UI
                     |
                     v
             Authenticated APIs
                     |
          +----------+-----------+
          |                      |
          v                      v
     PostgreSQL                 Redis
  Users / Projects          Cache / Job Queue
  Track Metadata            Temporary State
          |
          v
      Node.js Worker Services
          |
     +----+-----------------------+
     |                            |
     v                            v
 AI Audio Processing        MIDI / STY Processing
 Transcription              MIDI Parsing / Editing
 Source Separation          Yamaha STY Writer
 Instrument Detection       STY Validation
     |                            |
     +-------------+--------------+
                   |
                   v
          File / Object Storage
          Audio / MIDI / STY
                   |
                   v
          Telegram Bot Notifications
```

### 14.10 Security, Reliability, and Performance

- Validate and sanitize all user input.
- Enforce file size and format limits.
- Use secure authentication and authorization.
- Store secrets in environment variables or a secret manager.
- Apply API rate limits.
- Use background workers for long-running tasks.
- Provide retry handling for recoverable processing failures.
- Record useful error logs without exposing private user data.
- Use database migrations and backups.
- Provide clear processing progress and failure messages.
- Ensure users can download only files belonging to their authorized projects.

---

## 15. Important Functional Requirements

The system must not simply rename an audio file to MIDI or a MIDI file to STY.

1. **MIDI Export** must create a real Standard MIDI File (`.mid`) with valid SMF header and track chunks from detected musical events.
2. **STY Export** must use a valid Yamaha-compatible Style Writer that produces proper Yamaha binary chunks (`CASM`, `CSEG`, `CVO`, Section markers).
3. **Do not display fake conversion results.**
4. **Show processing status and progress in real-time.**
5. **Provide robust error handling and validation.**
6. **Clearly report when an AI backend or STY writer is not configured:**
   > *Yamaha STY export is not available because the required Style File structure has not been implemented.*
7. **Validate output before enabling downloads.**

---

## 16. Expected Output

Build a professional, extensible full-stack web application using the technology stack defined above.

**Deliverables:**
- [ ] Next.js (App Router) and React frontend
- [ ] TypeScript application code with strict typing
- [ ] Tailwind CSS styling with dark music studio theme
- [ ] shadcn/ui component system and Radix UI primitives
- [ ] Motion and GSAP animations
- [ ] Node.js backend route handlers and worker service
- [ ] Redis integration for BullMQ queue management
- [ ] PostgreSQL database with schema and migrations
- [ ] Google OAuth Login
- [ ] Telegram Login & Telegram Bot
- [ ] Telegram Mini App integration
- [ ] Progressive Web App (PWA) manifest and service worker
- [ ] Audio upload, WaveSurfer.js waveform visualizer, and Tone.js playback
- [ ] AI analysis and stem separation pipeline interface
- [ ] Interactive MIDI Piano Roll Editor with multi-track editing
- [ ] Standard MIDI File export (Type 0 and Type 1)
- [ ] MIDI to STY workflow and Yamaha Style Section Builder
- [ ] Yamaha PSR-S970 compatibility rules and validation
- [ ] Project management and export history

### Implementation Roadmap:
- **Phase 1:** Core Next.js App structure, Dark Studio UI, Authentication (Google + Telegram), PostgreSQL & Prisma schema, Project Management.
- **Phase 2:** Audio upload, WaveSurfer waveform player, Tone.js engine, Piano Roll MIDI editor component, MIDI parser and export.
- **Phase 3:** Backend job queue (Redis/BullMQ), AI Audio Separation & Transcription API integration (Demucs / Basic Pitch).
- **Phase 4:** Yamaha Style Section Builder (Intro, Main, Fill, Ending), Channel mapping (9-16), and STY binary validation & export engine.
- **Phase 5:** Telegram Mini App SDK integration, Telegram Bot notifications, PWA setup, and testing on Yamaha PSR-S970 format.

---

## 17. Final Goal

Create a complete music conversion platform with this workflow:

$$\text{Audio Song} \longrightarrow \text{AI Instrument Separation} \longrightarrow \text{MIDI Generation} \longrightarrow \text{MIDI Editing} \longrightarrow \text{Yamaha Style Creator} \longrightarrow \text{STY Export} \longrightarrow \text{Yamaha PSR-S970}$$

The platform should help music producers and keyboard players create editable MIDI arrangements and Yamaha accompaniment styles from existing songs.
