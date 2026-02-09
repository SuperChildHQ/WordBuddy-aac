# WordBuddy AAC — Feature Gap Analysis vs Proloquo & Proloquo2Go

Compiled February 8, 2026

---

## Estimation Legend

| Label | Complexity | Description |
|-------|-----------|-------------|
| **L** | Low | Straightforward implementation, clear path, mostly UI work |
| **M** | Medium | Moderate design decisions, some integration work |
| **H** | High | Significant architecture, new systems or subsystems needed |
| **VH** | Very High | Major new subsystem, external dependencies, research required |

Time estimates assume a **single experienced React Native / Expo developer** already familiar with the codebase. Parallel work by multiple developers can reduce wall-clock time but not total effort. Estimates include implementation, basic testing, and polish — not design research or clinical validation.

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

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status | Complexity | Time Estimate | Notes |
|---|---------|----------|-------------|------------------|:----------:|:-------------:|-------|
| 1 | **Symbol/pictographic library** | 25,000+ symbols (SymbolStix) | 27,000+ symbols (SymbolStix) | None — only text labels with placeholder color squares | **H** | **3–4 weeks** | Integrate open set (ARASAAC ~12K symbols, Mulberry ~3.5K). Requires asset bundling or CDN hosting, symbol search/browse UI, mapping to vocabulary items, and image caching. Largest upfront effort in Tier 1. |
| 2 | **Structured vocabulary system** (core words + fringe words, vocabulary levels) | Crescendo Evolution: 16,500+ words (4,500 symbol-supported + 12,000 Related Words), core words form 80% of daily speech | Crescendo: 3,900+ symbol-supported words, 10,000+ fringe words, 3 vocabulary levels (Basic/Intermediate/Advanced) | Flat 16-word demo board, no linguistic structure, no core/fringe distinction | **VH** | **4–6 weeks** | Foundational feature — most other Tier 1 items build on this. Requires vocabulary data modeling (core/fringe/levels), board generation from vocabulary data, level switching, and consistent motor-planning placement. Needs SLP/linguistic input for word selection. |
| 3 | **Word search** | Search function to find any word | Search with path display, step-by-step navigation to button location, auto-add from Storage | No search at all | **M** | **1–2 weeks** | Build search index across all boards, search UI with results list, navigate-to-result with board path display. Depends on #2 for full value. Current flat board structure makes a basic version simpler. |
| 4 | **Multiple natural voices** | 60+ free Acapela Neural voices (adult + children) | 100+ free downloadable voices across 4 languages, including diverse accents (American, British, Australian, Scottish, African American English) | Device default voice only via expo-speech | **M** | **1–2 weeks** | expo-speech provides `Speech.getAvailableVoicesAsync()` to enumerate device voices. Build voice picker UI, persist selection. Platform-dependent voice availability (iOS has more built-in voices than Android). No third-party voice SDK needed initially. |
| 5 | **Voice customization** (speed, pitch, pronunciation) | Speed, pitch adjustment, custom pronunciations per voice | Primary + Secondary voice roles, speed/pitch, custom pronunciations | No voice settings exposed | **L** | **3–5 days** | expo-speech already accepts `rate` and `pitch` parameters. Add sliders to settings, custom pronunciation dictionary (word→phonetic mapping stored in AsyncStorage). Low risk. |
| 6 | **Photo/image support on buttons** | Add personal photos and symbols | Photos from camera or library on any button | Placeholder images only — no camera/library picker | **M** | **1–2 weeks** | Add expo-image-picker dependency. Integrate into item editor with camera/library options. Store picked images in app document directory. Update board storage to reference local image URIs. Moderate — well-supported by Expo APIs. |
| 7 | **Grammar and inflection support** | Grammatic forms, inflection support | Full verb/noun/pronoun/adjective inflection, gender-neutral pronouns | No grammar support | **VH** | **4–6 weeks** | Language-specific inflection rules engine. Verb conjugation tables, noun declension, pronoun forms. Requires linguistic data per supported language. UI for selecting word forms (e.g., long-press to see inflections). Most complex Tier 1 feature from a linguistic perspective. |
| 8 | **Keyboard/typing mode** | QWERTY keyboard for literacy transition | Grid Keyboard (alphabetical), QWERTY Typing View with word prediction, external Bluetooth keyboard support, third-party keyboard compatibility | No typing mode | **M–H** | **2–3 weeks** | Custom on-screen keyboard component (QWERTY + alphabetical layouts). Text input area with TTS playback. Grid keyboard is simpler; QWERTY requires careful layout work. Word prediction (#9) is a separate effort. |
| 9 | **Word/sentence prediction** | — | Built-in predictive text in Typing View | None | **H** | **3–4 weeks** | Prediction engine options: frequency-based n-gram model (simpler, offline) or on-device ML model. Prediction bar UI above keyboard. Training on user's vocabulary and usage patterns. Can start with simple frequency-based approach and iterate. |
| 10 | **Phrase banks / message history** | — | Pre-stored phrases for quick access, history of previously spoken messages | No phrase storage, no history | **L** | **1 week** | Persist spoken sentences to storage with timestamps. Phrase management UI (save, categorize, delete). Quick-access panel. Low complexity — extends existing sentence bar and storage patterns. |
| 11 | **Motor planning support** (consistent word locations) | Fixed 60-button grid, words never move, pre-planned vocabulary aids muscle memory | Core words in consistent locations throughout all vocabulary levels | No vocabulary system to support motor planning | **M** | **1–2 weeks** | Primarily a vocabulary design concern — words must maintain position across grid sizes and vocabulary levels. Requires position-locking in the data model (existing `NormalizedPosition` helps). Tightly coupled to #2. |
| 12 | **Button color coding by word type** (modified Fitzgerald key) | Yes — semantic color categories | Customizable color schemes by word type | 8 arbitrary user-chosen colors, no semantic system | **L** | **3–5 days** | Define Fitzgerald key color mapping (verbs=green, nouns=orange, etc.). Tag vocabulary items by word type, auto-assign colors. Extend existing color system in item editor. Small, well-scoped change. |
| 13 | **Bilingual / multi-language support** | English only (6 regional variants: US, Canada, UK, Ireland, Australia, NZ, International) | English, Spanish, French, Dutch — bilingual code-switching mid-sentence | Hardcoded Dutch only | **H** | **3–4 weeks** | i18n framework for app UI strings. Multi-language vocabulary sets. Bilingual code-switching (mixing languages mid-sentence) is the hard part — requires per-item language tagging, dual TTS voice switching, and bilingual vocabulary pairing. Start with single-language switching, add code-switching later. |
| 14 | **Activity templates** | — | Thematic templates for creating activity-specific pages | No templates | **M** | **1–2 weeks** | Template data format (predefined board layouts for activities). Template browser/selector UI. Template application (create board from template). Depends on #1 and #2 for meaningful templates. |

**Tier 1 Total: ~26–40 weeks (single developer)**

---

### Tier 2: Accessibility & Alternative Access

Critical for users with motor, vision, or cognitive disabilities.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status | Complexity | Time Estimate | Notes |
|---|---------|----------|-------------|------------------|:----------:|:-------------:|-------|
| 15 | **Multiple grid size presets with vocabulary** | Fixed 60 buttons (48 symbol + 12 text) | 23 pre-programmed layouts from 3×3 (9) to 12×12 (144) buttons | Configurable 2–12 columns but no vocabulary presets per size | **M** | **1–2 weeks** | Define preset configurations mapping grid sizes to vocabulary subsets. Preset selector UI. Depends on #2 for vocabulary mapping. Existing grid system supports variable sizes already. |
| 16 | **Touch accommodations** (hold duration) | — | Hold Duration up to 5.0 seconds | None | **L** | **3–5 days** | Custom pressable wrapper with configurable `delayLongPress`. Settings slider for hold duration (0–5s). Modify GridButton touch handling. Well-contained change. |
| 17 | **Select on Release** | — | First Finger Up / First Finger Down modes, secondary voice preview | None | **L** | **3–5 days** | Gesture handler already distinguishes press-in/press-out events. Add mode toggle in settings. Preview voice on touch-down (speak label quietly), confirm on release. |
| 18 | **Select on Dwell** | — | Supported | None | **M** | **1 week** | Timer-based selection when pointer/finger rests on a button. Visual countdown indicator (progress ring or fill animation via Reanimated). Configurable dwell time. More useful for eye/head tracking users. |
| 19 | **Switch scanning** | Via iOS Switch Control only | Built-in: Automatic, Automatic Selecting, Inverse, Step, Automatic Step scanning. Patterns: Linear, Row/Column. 1-switch and 2-switch setups | None | **VH** | **4–6 weeks** | Most complex accessibility feature. Multiple scanning patterns (linear, row/column). Multiple modes (automatic, step, inverse). Visual highlight system scanning across grid. 1-switch and 2-switch input handling. Timing configuration. Requires careful UX design and testing with actual switch hardware. |
| 20 | **Keyguard compatibility** | Use mode only | Supported with adjustable button spacing | Not considered | **L** | **2–3 days** | Ensure buttons have sufficient spacing and clear hit targets. Adjustable gap settings (#24 covers this). Mostly a testing/validation task with physical keyguard hardware. |
| 21 | **Eye tracking** | iOS 18+ native, Hiru, TD Pilot, VersaEye | iOS 18+ native (with Snap to Item), Hiru, TD Pilot, VersaEye | Not tested or optimized | **H** | **2–3 weeks** | iOS 18+ native eye tracking API integration (platform-specific). Snap-to-item logic for grid buttons. Optimization of touch targets for gaze accuracy. Hardware-dependent testing. Limited to iOS; Android requires third-party SDKs. |
| 22 | **Head tracking** | HeadMouse Nano compatible | HeadMouse Nano compatible | Not tested | **M** | **1–2 weeks** | Primarily a compatibility testing and optimization effort. Ensure touch targets are large enough. Cursor-based interaction patterns. Platform-specific (HeadMouse works via iOS Accessibility). |
| 23 | **Paging buttons** (alternative to swiping) | — | For users with motor difficulties who can't swipe | No paging system | **L** | **3–5 days** | Add Previous/Next page buttons to board UI. Page indicator (e.g., "Page 2 of 4"). Straightforward UI addition to GridBoard component. |
| 24 | **Adjustable button spacing** | — | Fully adjustable | Fixed spacing | **L** | **2–3 days** | Add spacing slider to settings. Pass configurable gap/margin to GridBoard (already accepts `gap` prop). Persist in SettingsContext. Minimal effort. |
| 25 | **Visual contrast / vision settings** | Light/dark mode | Adjustable contrast, color schemes, button sizing | Light/dark only | **M** | **1–2 weeks** | High-contrast mode (thicker borders, bolder text). Font size scaling. Additional color scheme options beyond light/dark. Extend existing theme system in `constants/theme.ts`. |
| 26 | **Apple Personal Voice** | iOS 17+ (select inside app) | iOS 17+ (v8.1+) | Not implemented | **M** | **1 week** | iOS 17+ API for synthesized personal voice. Platform-specific implementation (`.ios.ts`). Check voice availability, present in voice picker. Requires iOS 17+ device with Personal Voice set up. No Android equivalent. |
| 27 | **Acapela MyOwnVoice** (voice banking) | Supported | Supported | Not implemented | **H** | **2–3 weeks** | Third-party SDK integration (Acapela licensing required). SDK availability for React Native uncertain — may need native module bridge. Business relationship with Acapela needed. High uncertainty. |
| 28 | **VoiceOver full support** | Compatible | Full compatibility | Not tested or optimized | **M** | **1–2 weeks** | Accessibility audit of all components. Add/fix `accessibilityLabel`, `accessibilityRole`, `accessibilityHint` throughout. Test navigation flow with VoiceOver. Ensure grid board, sentence bar, and modals are screen-reader navigable. |
| 29 | **AssistiveTouch** | Compatible | Compatible | Not tested | **L** | **2–3 days** | Compatibility testing and minor touch target adjustments. Ensure all interactive elements have minimum 44×44pt hit areas. Mostly a QA/testing effort. |
| 30 | **Progressive Language** | — | Gradually reveals buttons in developmental order without shrinking grid. Clinician-controlled, per-button toggle. Available for Intermediate/Advanced levels with Explore function | Nothing similar | **H** | **2–3 weeks** | Per-button visibility flag with developmental ordering metadata. Clinician interface for toggling button visibility. "Explore" function to temporarily reveal hidden buttons. Buttons maintain position when hidden (show as blank cells). Depends on #2 for vocabulary levels. |
| 31 | **ExpressivePower** (expressive sounds/inflections) | — | Pre-recorded childlike sounds, inflections on buttons | Nothing similar | **M–H** | **2–3 weeks** | Audio recording capability (expo-av supports recording). Sound library for pre-recorded expressive sounds. Assign sounds to buttons alongside TTS. Playback with emotional inflection. Content creation (recording/sourcing sounds) is significant effort beyond code. |
| 32 | **Vocabulary protection** (prevent accidental changes) | Essential organization/content cannot be accidentally changed | — | No protection — any edit can break vocabulary | **L** | **3–5 days** | Lock flag on boards/items. Distinguish "essential" vs "user-added" content. Prevent deletion of locked items in edit mode. Simple data model addition + UI guard. |

**Tier 2 Total: ~20–32 weeks (single developer)**

---

### Tier 3: Collaboration, Backup & Security

Essential for deployment with therapists, teachers, and caregivers.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status | Complexity | Time Estimate | Notes |
|---|---------|----------|-------------|------------------|:----------:|:-------------:|-------|
| 33 | **Team roles** (Viewer/Editor/Admin) | Unlimited free team members with role-based access | — | No multi-user support | **VH** | **4–6 weeks** | Requires backend service (auth, user management, RBAC). Account system, invitation flow, role assignment UI. Real-time or eventual consistency for shared boards. Largest Tier 3 effort — introduces server dependency for the first time. |
| 34 | **Admin PIN / settings lock** | PIN-protected admin actions | PIN + security question, hide Edit/Options buttons | No access control | **L** | **3–5 days** | PIN entry modal. Secure PIN storage (expo-secure-store). Gate edit mode and settings behind PIN. Optional security question. Well-scoped, no backend needed. |
| 35 | **Cross-device vocabulary sync** | Automatic cloud sync across all team devices | — | No sync | **VH** | **6–8 weeks** | Cloud backend (e.g., Firebase, Supabase, or custom). Sync protocol with conflict resolution (last-write-wins or CRDT). Offline-first with queue. Account/auth system (can share with #33). Most technically challenging feature in the entire roadmap. |
| 36 | **Companion guidance app** (Proloquo Coach) | Free with subscription — learning chapters, practice activities, in-app AAC expert support | — | Nothing similar | **VH** | **8–12 weeks** | Entirely separate application. Educational content creation (chapters, activities). In-app expert support system. Could start as in-app help section (#47) and evolve. Massive scope — consider phased approach or web-based alternative. |
| 37 | **Automatic cloud backup** | Via team sync | Daily iCloud backup (enabled by default since v5) | No backup | **H** | **2–3 weeks** | Cloud storage integration (e.g., Firebase Storage, S3). Scheduled backup logic. Backup management UI (view, restore, delete). Depends on having a cloud backend (#35 or standalone). |
| 38 | **Cloud storage backup** | Export to iCloud Files, Dropbox (not Google Drive) | Dropbox + Google Drive auto-upload (3 most recent kept) | No backup | **H** | **2–4 weeks** | OAuth integration with cloud providers (Dropbox, Google Drive, iCloud). File upload/download per provider API. Provider selection UI. Each provider adds ~3–5 days. Start with one provider, add others incrementally. |
| 39 | **Computer-based transfer** | — | WiFi transfer to/from computer (same network) | No export/import | **M–H** | **2–3 weeks** | Local HTTP server on device (expo can run local server). Network discovery (Bonjour/mDNS). Web UI for computer-side file browser. Transfer protocol. Platform-specific networking considerations. |
| 40 | **Export/import customizations** | Portable file with button/folder changes, voice settings, pronunciation, skin tone | Full backup/restore across channels | No export/import | **M** | **1–2 weeks** | Define export file format (JSON bundle + images as zip). Export all boards, settings, custom pronunciations, images. Import with validation and conflict handling. Share sheet integration for export. Good standalone feature — no backend needed. |
| 41 | **Board/vocabulary sharing** | Free sharing with support network | Backup file sharing | No sharing | **M** | **1–2 weeks** | Share individual boards or vocabulary sets (subset of #40). Share via system share sheet, email, or messaging. Import shared boards. Builds on #40 export format. |
| 42 | **Post-expiration data access** | Export available, backup accessible 6 months after subscription expires | N/A (one-time purchase) | N/A | **M** | **1–2 weeks** | Subscription state management. Graceful degradation (read-only mode). Export always available. Depends on business model decisions and IAP implementation. |
| 43 | **Search history privacy controls** | — | Clear search history option | No search exists | **L** | **1–2 days** | Clear search history button in settings. Opt-out of history storage. Trivial once #3 (word search) is implemented. |

**Tier 3 Total: ~28–44 weeks (single developer)**

---

### Tier 4: Learning, Teaching & Support Tools

Features that support AAC learning and implementation.

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status | Complexity | Time Estimate | Notes |
|---|---------|----------|-------------|------------------|:----------:|:-------------:|-------|
| 44 | **Focus Mode** | Light and motion guide attention to target words without hiding vocabulary. Stays active across navigation | — | No teaching tools | **M–H** | **2–3 weeks** | Semi-transparent overlay dimming non-target buttons. Target word highlighting with optional animation (Reanimated). Persistence across board navigation. Teacher controls to set focus targets. Requires thoughtful UX to avoid being distracting. |
| 45 | **Thinking Space** (iPad only) | Non-linear workspace to arrange symbols visually — choice-making, thought organization, visual schedules, sequences, lists | — | Nothing similar | **H** | **3–4 weeks** | Free-form drag-and-drop canvas (react-native-gesture-handler + Reanimated). Symbol placement, connecting lines, grouping. Serialize/deserialize workspace state. iPad-optimized layout. Significantly different interaction model from the grid-based board. |
| 46 | **Related Words** | Instant access to more specific/nuanced words, supports vocabulary expansion as user learns to read | — | Nothing similar | **H** | **2–3 weeks** | Semantic relationship database (synonyms, categories, specificity levels). UI for browsing related words (long-press or dedicated panel). Navigation to related word location in vocabulary. Requires curated linguistic data per language. |
| 47 | **In-app help / tutorials** | Via Proloquo Coach companion app | Built-in help articles | No help or onboarding | **M** | **1–2 weeks** | Onboarding flow for first launch. Help articles/FAQs accessible from settings. Optional tooltip-based feature discovery. Content writing is the main effort. |
| 48 | **Core Word Classroom** | — | Website activities for teaching communication | N/A (web resource) | **M** | **2–3 weeks** | Separate web resource (can leverage existing web target). Teaching activities and lesson plans. Content creation is the primary effort, not code. Could be a section within the web version of the app. |
| 49 | **Usage statistics / logging** | — | — | No analytics or usage tracking | **M–H** | **2–3 weeks** | Event tracking system (button presses, navigation, session duration). Local statistics storage (privacy-first, no external analytics). Dashboard UI with charts (word frequency, usage over time). Useful for SLPs to track progress. Consider privacy implications carefully. |

**Tier 4 Total: ~12–18 weeks (single developer)**

---

### Tier 5: Platform & Integration

| # | Feature | Proloquo | Proloquo2Go | WordBuddy Status | Complexity | Time Estimate | Notes |
|---|---------|----------|-------------|------------------|:----------:|:-------------:|-------|
| 50 | **Apple Watch app** | — | Communication + use as scanning switch | Not applicable | **H** | **3–4 weeks** | Separate watchOS target (not supported by Expo — requires native Swift/SwiftUI). WatchConnectivity for phone-watch communication. Minimal AAC board on watch face. Switch scanning input from watch. Expo ejection or separate native project needed. |
| 51 | **Mac app** | — | Separate app ($124.99) | Web version serves this role | **L–M** | **1–2 weeks** | Web version already covers this. Desktop optimizations: keyboard shortcuts, larger grid defaults, menu bar, window management. Could package as Electron/Tauri app for native distribution. Mostly polish. |
| 52 | **Phone/FaceTime call integration** | iOS 18+ Audio in Calls with AAC voice | iOS 18+ Audio in Calls with AAC voice | Not addressed | **H** | **2–3 weeks** | iOS 18+ Audio in Calls API (CallKit). Route TTS audio to phone call audio stream. Platform-specific (`.ios.ts`). Requires native module for CallKit integration — not available in Expo managed workflow. May require expo-dev-client or ejection. |
| 53 | **External keyboard support** | — | Bluetooth keyboard, third-party keyboards | Not tested | **M** | **1–2 weeks** | Key event handling for grid navigation (arrow keys, enter, tab). Keyboard shortcuts for common actions (speak, clear, back). Platform testing with Bluetooth keyboards. React Native has basic keyboard event support. |

**Tier 5 Total: ~7–11 weeks (single developer)**

---

## Grand Total Effort Summary

| Phase | Scope | Estimated Effort | Key Dependencies |
|-------|-------|:----------------:|------------------|
| **Tier 1** — Essential AAC | 14 features | **26–40 weeks** | #1 (symbols) and #2 (vocabulary) are foundational — most other features depend on them |
| **Tier 2** — Accessibility | 18 features | **20–32 weeks** | #19 (switch scanning) is the largest single item; many items are independent and parallelizable |
| **Tier 3** — Collaboration & Backup | 11 features | **28–44 weeks** | #33 (teams) and #35 (sync) require backend infrastructure — significant architectural shift |
| **Tier 4** — Learning & Teaching | 6 features | **12–18 weeks** | #45 (Thinking Space) and #46 (Related Words) require the most new architecture |
| **Tier 5** — Platform & Integration | 4 features | **7–11 weeks** | #50 (Watch) and #52 (Call integration) require native code outside Expo managed workflow |
| | **53 features total** | **93–145 weeks** | |

> **Note:** The grand total assumes sequential single-developer work. With a team of 2–3 developers working in parallel on independent features, Tiers 1–2 could realistically be compressed to ~6–9 months of wall-clock time. Tier 3 requires backend infrastructure decisions early. Features within each tier are roughly ordered by priority and can be delivered incrementally.

---

## Recommended Starting Sequence (Tier 1)

Based on dependency analysis, the optimal build order for Phase 1 is:

```
1. #12 Button color coding (3–5 days)     — Quick win, no dependencies
2. #5  Voice customization (3–5 days)      — Quick win, extends existing TTS
3. #10 Phrase banks / history (1 week)     — Quick win, extends sentence bar
4. #6  Photo support on buttons (1–2 wk)   — Independent, unblocks richer boards
5. #1  Symbol library (3–4 weeks)          — Foundational, unblocks #2
6. #2  Structured vocabulary (4–6 weeks)   — Foundational, unblocks #3, #7, #11
7. #4  Multiple voices (1–2 weeks)         — Independent, pairs with #5
8. #3  Word search (1–2 weeks)             — Depends on #2
9. #11 Motor planning support (1–2 weeks)  — Depends on #2
10. #8  Keyboard/typing mode (2–3 weeks)   — Independent
11. #14 Activity templates (1–2 weeks)     — Depends on #1, #2
12. #13 Bilingual support (3–4 weeks)      — Depends on #2, #7
13. #9  Word prediction (3–4 weeks)        — Depends on #8
14. #7  Grammar & inflection (4–6 weeks)   — Complex, benefits from #2, #13
```

This sequence front-loads quick wins (#12, #5, #10) for immediate user value, then tackles the two foundational features (#1 symbols, #2 vocabulary) that unblock the majority of remaining work.

---

*Based on official AssistiveWare documentation, App Store listings, and product comparison materials (February 2026). Estimates added February 2026 based on current codebase analysis.*
