# WordBuddy AAC — Feature Gap Analysis vs Proloquo & Proloquo2Go

Compiled February 8, 2026

---

## What WordBuddy Currently Has

- Grid-based board with configurable columns (2–12)
- Three item types: Word, Folder, Popover
- Folder navigation (nested boards with back/home)
- Sentence bar (build multi-word utterances, play all)
- Basic TTS via expo-speech (device default voice, no settings)
- Edit mode (add/edit/delete items, tap empty cells)
- Item editor with text label, 8 color swatches, type picker
- Placeholder images (placehold.co — no real symbols)
- File-based board storage (expo-file-system JSON)
- Demo board with 16 Dutch core words
- Light/dark theme support
- Bottom toolbar (Back, Home, AI stub, Settings)
- Cross-platform: iOS, Android, Web

---

## Feature Gaps — Organized by Priority

### Tier 1: Essential AAC (Must-Have for Real Use)

These are baseline requirements for a clinically usable AAC app.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status |
|---|---------|----------|-------------|------------------|
| 1 | **Symbol/pictographic library** | 25,000+ symbols (SymbolStix) | 27,000+ symbols (SymbolStix) | None — only text labels with placeholder color squares |
| 2 | **Structured vocabulary system** (core words + fringe words, vocabulary levels) | Crescendo Evolution: 16,500+ words (4,500 symbol-supported + 12,000 Related Words), core words form 80% of daily speech | Crescendo: 3,900+ symbol-supported words, 10,000+ fringe words, 3 vocabulary levels (Basic/Intermediate/Advanced) | Flat 16-word demo board, no linguistic structure, no core/fringe distinction |
| 3 | **Word search** | Search function to find any word | Search with path display, step-by-step navigation to button location, auto-add from Storage | No search at all |
| 4 | **Multiple natural voices** | 60+ free Acapela Neural voices (adult + children) | 100+ free downloadable voices across 4 languages, including diverse accents (American, British, Australian, Scottish, African American English) | Device default voice only via expo-speech |
| 5 | **Voice customization** (speed, pitch, pronunciation) | Speed, pitch adjustment, custom pronunciations per voice | Primary + Secondary voice roles, speed/pitch, custom pronunciations | No voice settings exposed |
| 6 | **Photo/image support on buttons** | Add personal photos and symbols | Photos from camera or library on any button | Placeholder images only — no camera/library picker |
| 7 | **Grammar and inflection support** | Grammatic forms, inflection support | Full verb/noun/pronoun/adjective inflection, gender-neutral pronouns | No grammar support |
| 8 | **Keyboard/typing mode** | QWERTY keyboard for literacy transition | Grid Keyboard (alphabetical), QWERTY Typing View with word prediction, external Bluetooth keyboard support, third-party keyboard compatibility | No typing mode |
| 9 | **Word/sentence prediction** | — | Built-in predictive text in Typing View | None |
| 10 | **Phrase banks / message history** | — | Pre-stored phrases for quick access, history of previously spoken messages | No phrase storage, no history |
| 11 | **Motor planning support** (consistent word locations) | Fixed 60-button grid, words never move, pre-planned vocabulary aids muscle memory | Core words in consistent locations throughout all vocabulary levels | No vocabulary system to support motor planning |
| 12 | **Button color coding by word type** (modified Fitzgerald key) | Yes — semantic color categories | Customizable color schemes by word type | 8 arbitrary user-chosen colors, no semantic system |
| 13 | **Bilingual / multi-language support** | English only (6 regional variants: US, Canada, UK, Ireland, Australia, NZ, International) | English, Spanish, French, Dutch — bilingual code-switching mid-sentence | Hardcoded Dutch only |
| 14 | **Activity templates** | — | Thematic templates for creating activity-specific pages | No templates |

### Tier 2: Accessibility & Alternative Access

Critical for users with motor, vision, or cognitive disabilities.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status |
|---|---------|----------|-------------|------------------|
| 15 | **Multiple grid size presets with vocabulary** | Fixed 60 buttons (48 symbol + 12 text) | 23 pre-programmed layouts from 3×3 (9) to 12×12 (144) buttons | Configurable 2–12 columns but no vocabulary presets per size |
| 16 | **Touch accommodations** (hold duration) | — | Hold Duration up to 5.0 seconds | None |
| 17 | **Select on Release** | — | First Finger Up / First Finger Down modes, secondary voice preview | None |
| 18 | **Select on Dwell** | — | Supported | None |
| 19 | **Switch scanning** | Via iOS Switch Control only | Built-in: Automatic, Automatic Selecting, Inverse, Step, Automatic Step scanning. Patterns: Linear, Row/Column. 1-switch and 2-switch setups | None |
| 20 | **Keyguard compatibility** | Use mode only | Supported with adjustable button spacing | Not considered |
| 21 | **Eye tracking** | iOS 18+ native, Hiru, TD Pilot, VersaEye | iOS 18+ native (with Snap to Item), Hiru, TD Pilot, VersaEye | Not tested or optimized |
| 22 | **Head tracking** | HeadMouse Nano compatible | HeadMouse Nano compatible | Not tested |
| 23 | **Paging buttons** (alternative to swiping) | — | For users with motor difficulties who can't swipe | No paging system |
| 24 | **Adjustable button spacing** | — | Fully adjustable | Fixed spacing |
| 25 | **Visual contrast / vision settings** | Light/dark mode | Adjustable contrast, color schemes, button sizing | Light/dark only |
| 26 | **Apple Personal Voice** | iOS 17+ (select inside app) | iOS 17+ (v8.1+) | Not implemented |
| 27 | **Acapela MyOwnVoice** (voice banking) | Supported | Supported | Not implemented |
| 28 | **VoiceOver full support** | Compatible | Full compatibility | Not tested or optimized |
| 29 | **AssistiveTouch** | Compatible | Compatible | Not tested |
| 30 | **Progressive Language** | — | Gradually reveals buttons in developmental order without shrinking grid. Clinician-controlled, per-button toggle. Available for Intermediate/Advanced levels with Explore function | Nothing similar |
| 31 | **ExpressivePower** (expressive sounds/inflections) | — | Pre-recorded childlike sounds, inflections on buttons | Nothing similar |
| 32 | **Vocabulary protection** (prevent accidental changes) | Essential organization/content cannot be accidentally changed | — | No protection — any edit can break vocabulary |

### Tier 3: Collaboration, Backup & Security

Essential for deployment with therapists, teachers, and caregivers.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status |
|---|---------|----------|-------------|------------------|
| 33 | **Team roles** (Viewer/Editor/Admin) | Unlimited free team members with role-based access | — | No multi-user support |
| 34 | **Admin PIN / settings lock** | PIN-protected admin actions | PIN + security question, hide Edit/Options buttons | No access control |
| 35 | **Cross-device vocabulary sync** | Automatic cloud sync across all team devices | — | No sync |
| 36 | **Companion guidance app** (Proloquo Coach) | Free with subscription — learning chapters, practice activities, in-app AAC expert support | — | Nothing similar |
| 37 | **Automatic cloud backup** | Via team sync | Daily iCloud backup (enabled by default since v5) | No backup |
| 38 | **Cloud storage backup** | Export to iCloud Files, Dropbox (not Google Drive) | Dropbox + Google Drive auto-upload (3 most recent kept) | No backup |
| 39 | **Computer-based transfer** | — | WiFi transfer to/from computer (same network) | No export/import |
| 40 | **Export/import customizations** | Portable file with button/folder changes, voice settings, pronunciation, skin tone | Full backup/restore across channels | No export/import |
| 41 | **Board/vocabulary sharing** | Free sharing with support network | Backup file sharing | No sharing |
| 42 | **Post-expiration data access** | Export available, backup accessible 6 months after subscription expires | N/A (one-time purchase) | N/A |
| 43 | **Search history privacy controls** | — | Clear search history option | No search exists |

### Tier 4: Learning, Teaching & Support Tools

Features that support AAC learning and implementation.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status |
|---|---------|----------|-------------|------------------|
| 44 | **Focus Mode** | Light and motion guide attention to target words without hiding vocabulary. Stays active across navigation | — | No teaching tools |
| 45 | **Thinking Space** (iPad only) | Non-linear workspace to arrange symbols visually — choice-making, thought organization, visual schedules, sequences, lists | — | Nothing similar |
| 46 | **Related Words** | Instant access to more specific/nuanced words, supports vocabulary expansion as user learns to read | — | Nothing similar |
| 47 | **In-app help / tutorials** | Via Proloquo Coach companion app | Built-in help articles | No help or onboarding |
| 48 | **Core Word Classroom** | — | Website activities for teaching communication | N/A (web resource) |
| 49 | **Usage statistics / logging** | — | — | No analytics or usage tracking |

### Tier 5: Platform & Integration

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status |
|---|---------|----------|-------------|------------------|
| 50 | **Apple Watch app** | — | Communication + use as scanning switch | Not applicable |
| 51 | **Mac app** | — | Separate app ($124.99) | Web version serves this role |
| 52 | **Phone/FaceTime call integration** | iOS 18+ Audio in Calls with AAC voice | iOS 18+ Audio in Calls with AAC voice | Not addressed |
| 53 | **External keyboard support** | — | Bluetooth keyboard, third-party keyboards | Not tested |

---

## Summary: Top Priorities for WordBuddy

### Phase 1 — Minimum Viable AAC
Without these, the app cannot serve real AAC users:

1. **Symbol library** — Integrate an open symbol set (e.g., ARASAAC, OpenMoji, or Mulberry)
2. **Structured vocabulary** — Build a core word vocabulary with consistent placement
3. **Word search** — Find any word across the vocabulary
4. **Voice selection & settings** — Multiple voices, speed/pitch control
5. **Photo support on buttons** — Camera/library image picker
6. **Grammar basics** — At least verb tense support
7. **Button color coding** — Semantic Fitzgerald key colors

### Phase 2 — Accessibility
Required for users with motor/vision/cognitive disabilities:

8. **Touch accommodations** — Hold duration, select on release
9. **Multiple grid presets** — With vocabulary mapped to each size
10. **Settings lock / PIN** — Prevent accidental changes by user
11. **Progressive language reveal** — Developmental button showing/hiding
12. **VoiceOver & accessibility audit**

### Phase 3 — Collaboration & Data Safety
Required for deployment with support teams:

13. **Backup/restore** — At minimum local export/import
14. **Cloud sync** — Across caregiver devices
15. **Team roles** — Role-based access control
16. **Board sharing/templates**

### Phase 4 — Advanced Features
Differentiation and learning support:

17. **Typing mode with word prediction**
18. **Focus Mode** — Guided attention teaching tool
19. **Thinking Space** — Visual thought organization
20. **Bilingual support**
21. **Phrase banks & message history**
22. **Apple Watch support**

---

*Based on official AssistiveWare documentation, App Store listings, and product comparison materials (February 2026).*
