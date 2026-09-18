<div align="center">

# 🌊 PacingPulse

### *Prose Cadence, Sentence Length & Narrative Rhythm Visualizer*
**গদ্যের ছন্দ, বাক্যের দৈর্ঘ্য এবং কাহিনীর গতিপ্রকৃতি তাৎক্ষণিকভাবে পর্যবেক্ষণ করার আধুনিক ওয়েব অ্যাপ**

[![Launch Live App](https://img.shields.io/badge/🚀_Launch_Live_App-PacingPulse-38bdf8?style=for-the-badge&logo=rocket&logoColor=white)](https://tbahsan.github.io/PacingPulse/)

<br />

[![CI](https://github.com/tbahsan/PacingPulse/actions/workflows/ci.yml/badge.svg)](https://github.com/tbahsan/PacingPulse/actions/workflows/ci.yml)
[![Pages](https://github.com/tbahsan/PacingPulse/actions/workflows/pages.yml/badge.svg)](https://tbahsan.github.io/PacingPulse/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Privacy: Zero Tracking](https://img.shields.io/badge/Privacy-100%25%20Client--Side-10b981?logo=shield&logoColor=white)](docs/SCOPE.md)
[![a11y: WCAG 2.1 AA](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-f59e0b)](docs/ACCESSIBILITY.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<br />

```
       ___               _               ___          _             
      / _ \ ___ _  ____ (_) ___   ___ _ / _ \ __ __  | | ___  ___   
     / ___// _ `/ / __// // _ \ / _ `// ___// // /  | |(_-< / -_)  
    /_/    \_,_/  \__//_//_//_/ \_, //_/    \_,_/   |_|/__/ \___/   
                                /___/                               
     ▂▃▅▆▇█  Cadence • Rhythm • Word Lengths • Monotony Radar  █▇▆▅▃▂
```

</div>

---

## 🌟 Overview / সংক্ষিপ্ত পরিচিতি

**PacingPulse** is an offline-first, client-side prose cadence visualizer built for novelists, essayists, screenwriters, and editors. Writing has intrinsic music. When every sentence shares identical length, the reader's attention stagnates. When short bursts intersect with rolling compound phrases and grand periodic cadences, prose sings.

PacingPulse breaks down text into sentence-level metrics, renders an interactive, color-coded SVG pulse chart with rolling trendlines, flags repetitive drones, and connects chart bars bidirectionally to your text editor.

> **প্যাসিংপালস (PacingPulse)** একটি আধুনিক ও দ্রুতগতির ওয়েব টুল যা কোনো প্রকার সার্ভার বা ট্র্যাকিং ছাড়া সম্পূর্ণ ক্লায়েন্ট-সাইডে কাজ করে। এটি গদ্যের প্রতিটি বাক্যের শব্দসংখ্যা বিশ্লেষণ করে একটি ইন্টারেক্টিভ এসভিজি পালস চার্ট তৈরি করে, একঘেয়ে ড্রোন বাক্য সনাক্ত করে এবং লেখকের লেখার ছন্দ নিখুঁত করতে সহায়তা করে।

---

## 🎵 The Philosophy of Cadence

> *"This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety.*
>
> *Now listen. I vary the sentence length, and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes, when I am certain the reader is rested, I will engage him with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo..."*
>
> — **Gary Provost**, *100 Ways to Improve Your Writing* (1985)

### Visualizing the Provost Effect in PacingPulse:

```text
[ 5 words ] ▄▄       This sentence has five words.
[ 5 words ] ▄▄       Here are five more words.
[ 5 words ] ▄▄       Five-word sentences are fine.           ⚠️ MONOTONOUS DRONE
[ 5 words ] ▄▄       But several together become monotonous.    (Zero Cadence Variance)
[ 5 words ] ▄▄       Listen to what is happening.
[ 5 words ] ▄▄       The writing is getting boring.
───────────────────────────────────────────────────────────────────────────────
[ 2 words ] ▂        Now listen.
[ 5 words ] ▄▄       I vary the sentence length...
[ 5 words ] ▄▄       ...and I create music.
[ 1 words ]          Music.                                  ✨ NATURAL SYMPHONY
[ 3 words ] ▂        The writing sings.                         (High Variance & Flow)
[ 9 words ] ▅▅▅      It has a pleasant rhythm, a lilt, a harmony.
[ 4 words ] ▃        I use short sentences.
[ 7 words ] ▄▄▄      And I use sentences of medium length.
[54 words ] ████████ And sometimes, when I am certain the reader is rested...
```

---

## ✨ Key Features / প্রধান সুবিধাসমূহ

| Feature | Description | বাংলা বিবরণ |
| :--- | :--- | :--- |
| 📊 **Interactive SVG Bar Chart** | High-DPI scalable vector bars representing sentence length, color-coded by pacing tempo. | প্রতিটি বাক্যের দৈর্ঘ্যের জন্য স্কেলেবল ভেক্টর বার চার্ট। |
| 📈 **Rolling Moving Average** | 3-sentence rolling trendline displaying narrative momentum and tension shifts. | কাহিনীর গতিপ্রকৃতি ও টানটান ভাব পরিমাপ করার চলমান রেখা। |
| 🔗 **Bidirectional Sync** | Hover or click any bar to instantly highlight and scroll to that sentence in the editor. | চার্টে ক্লিক করলে স্বয়ংক্রিয়ভাবে টেক্সটের বাক্যে হাইলাইট ও স্ক্রল হয়। |
| ⚡ **Cadence Diversity ($\sigma$)** | Standard Deviation calculation showing mathematical variance in sentence lengths. | বাক্যের দৈর্ঘ্যের বৈচিত্র্য পরিমাপক স্ট্যান্ডার্ড ডেভিয়েশন। |
| 🚨 **Monotony & Drone Radar** | Automatically detects 3+ consecutive sentences with identical or $\le 1$ word delta. | একই দৈর্ঘ্যের একটানা ৩+ বাক্য বা একঘেয়ে ছন্দ সনাক্তকরণ। |
| 📚 **Curated Sample Presets** | One-click access to Gary Provost's rhythm guide, high-tempo pursuit, and lyrical atmosphere. | গ্যারি প্রোভোস্টের বিখ্যাত উদাহরণসহ তিনটি বিশেষ প্রিসেট। |
| 💾 **Data Export (CSV / TXT)** | One-click export of sentence word counts, character counts, categories, and raw text. | পূর্ণাঙ্গ মেট্রিক্স সিএসভি (CSV) অথবা টেক্সট ফাইলে ডাউনলোড। |
| 🔒 **Zero Server / Zero Tracking** | 100% client-side. No API keys, no network calls, optional local browser storage. | কোনো সার্ভার নেই, কোনো ট্র্যাকিং নেই। আপনার লেখা সম্পূর্ণ সুরক্ষিত। |
| 🌓 **Dual Themes (Dark / Light)** | High-contrast WCAG 2.1 AA accessible theme designed for midnight editing. | গভীর রাতের লেখার জন্য চমৎকার ডার্ক ও লাইট থিম সাপোর্ট। |

---

## 🎨 Cadence Taxonomy & Color Palette

```
  ┌──────────────┬───────────────┬──────────────────────────────────────────┐
  │ Category     │ Length        │ Emotional & Narrative Tempo              │
  ├──────────────┼───────────────┼──────────────────────────────────────────┤
  │ 🟦 Short     │ 1 – 7 words   │ High urgency, staccato punch, tension    │
  │ 🟩 Medium    │ 8 – 20 words  │ Balanced narrative, conversational flow  │
  │ 🟪 Long      │ 21 – 35 words │ Complex thought, elaborate description   │
  │ 🟥 Marathon  │ 36+ words     │ Lyrical sweep, sensory crescendo         │
  │ 🟧 Trendline │ Moving Avg    │ 3-sentence rolling average of cadence    │
  └──────────────┴───────────────┴──────────────────────────────────────────┘
```

---

## 🏗️ Architecture & Pipeline

```
  ┌─────────────────────────────────────────────────────────────┐
  │                     Raw Text Input                          │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │           Deterministic Sentence Segmenter                  │
  │   - Guard abbreviations (Mr., Dr., etc., p.m., approx.)     │
  │   - Guard decimal digits (3.14, $12.50) & ellipses (...)    │
  │   - Preserve dialogue tags ("Run!" he yelled.)              │
  │   - Track exact document character offset spans             │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │               Pacing Analytics Engine                       │
  │   - Word counting via Unicode boundaries                    │
  │   - Category assignment (Short, Medium, Long, Marathon)     │
  │   - Rolling moving average (Window = 3)                     │
  │   - Standard deviation (Rhythm variety index)               │
  │   - Monotony run detector (Runs of Δ ≤ 1 word length)       │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
        ┌────────────────────────┴────────────────────────┐
        ▼                                                 ▼
┌───────────────────────────────┐         ┌───────────────────────────────┐
│     Interactive SVG Chart     │ ◄─────► │   Editor Highlight Backdrop   │
│ (Dynamic bars, hover/click)   │         │ (Two-way focus synchronization│
└───────────────────────────────┘         └───────────────────────────────┘
```

---

## ⚡ Quick Start / লোকাল রান করার নিয়ম

### 1. Run in GitHub Codespaces
Open this repository in GitHub Codespaces or run:
```bash
python3 unpack_codespace_pacingpulse.py
npm install
npm run dev
```

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/tbahsan/PacingPulse.git
cd PacingPulse

# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Run test suite (14 unit & DOM tests)
npm test

# Build production bundle
npm run build
```

---

## 🧪 Test Suite & Quality Verification

```bash
# Run unit & integration tests
npm test

# Type-check TypeScript codebase
npm run typecheck

# Production build preview
npm run preview
```

- **Unit & DOM Coverage**: 14 tests verifying sentence boundaries, abbreviation guards, dialogue attribution, statistical calculations, and SVG generation.
- **Bundle Weight**: Ultra-lightweight ~15 kB JS (~6 kB gzipped) with zero external fonts or CDN stylesheets.

---

## 📖 Complete Documentation

Detailed technical design specs are available in [`docs/`](docs/):

- 🎯 **[Project Scope & Boundaries](docs/SCOPE.md)** — Architectural principles and zero-telemetry rules.
- 📐 **[Linguistic Rules & Heuristics](docs/RULES.md)** — Sentence segmentation logic, punctuation heuristics, and drone math.
- 📚 **[Data Sources & Attribution](docs/DATA_SOURCES.md)** — Gary Provost sample quotation and offline assets.
- 🧪 **[Evaluation & Benchmarks](docs/EVALUATION.md)** — Test methodology, runtime performance, and edge case coverage.
- ♿ **[Accessibility Standard](docs/ACCESSIBILITY.md)** — WCAG 2.1 AA contrast matrix, ARIA landmarks, and keyboard bindings.
- 🚀 **[Deployment Guide](docs/DEPLOY.md)** — Automated GitHub Actions CI/CD to GitHub Pages.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

Developed with ❤️ by **[Tasneem Bin Ahsan](https://github.com/tbahsan)**.
