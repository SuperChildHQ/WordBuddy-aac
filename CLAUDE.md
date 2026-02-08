# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WordBuddy-aac is an AAC (Augmentative and Alternative Communication) app built with React Native and Expo. It targets iOS, Android, and Web.

## Common Commands

- `npm start` — Start Expo dev server
- `npm run ios` — Start on iOS simulator
- `npm run android` — Start on Android emulator
- `npm run web` — Start for web browser
- `npm run lint` — Run ESLint (via `expo lint`)

No test framework is configured yet.

## Architecture

### Tech Stack
- **Expo SDK 54** with React Native 0.81 and React 19
- **Expo Router** for file-based routing (entry point: `expo-router/entry`)
- **React Navigation** for bottom tab navigation
- **React Native Reanimated** for animations
- **TypeScript** in strict mode

### Experimental Features Enabled
- `reactCompiler: true` — React Compiler optimizations
- `typedRoutes: true` — Type-safe route navigation
- `newArchEnabled: true` — React Native New Architecture

### Routing (Expo Router)

File-based routing in `app/`:
```
app/_layout.tsx          → Root Stack with ThemeProvider
app/(tabs)/_layout.tsx   → Bottom tab navigator (Home, Explore)
app/(tabs)/index.tsx     → Home screen
app/(tabs)/explore.tsx   → Explore screen
app/modal.tsx            → Modal screen (presented as modal)
```

### Key Conventions

- **Path alias**: `@/*` maps to the project root (e.g., `import { Colors } from '@/constants/theme'`)
- **Platform-specific files**: Use `.ios.ts`, `.web.ts` suffixes for platform variants (see `hooks/use-color-scheme.ts` and `components/ui/icon-symbol.tsx`)
- **Theme system**: Light/dark mode via `useColorScheme()` hook and `Colors`/`Fonts` from `constants/theme.ts`. Theme-aware components (`ThemedText`, `ThemedView`) resolve colors automatically
- **Orientation**: Portrait only
- **Kebab-case filenames**: All component and hook files use kebab-case (e.g., `themed-text.tsx`, `use-color-scheme.ts`)
