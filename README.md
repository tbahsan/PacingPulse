# PacingPulse 🌊

> **Interactive Prose Cadence & Sentence Length Visualizer for Writers and Editors.**  
> *গদ্যের ছন্দ, বাক্যের দৈর্ঘ্য এবং কাহিনীর গতিপ্রকৃতি তাৎক্ষণিকভাবে পর্যবেক্ষণ করার আধুনিক ওয়েব অ্যাপ।*

[![CI](https://github.com/tbahsan/PacingPulse/actions/workflows/ci.yml/badge.svg)](https://github.com/tbahsan/PacingPulse/actions/workflows/ci.yml)
[![Pages](https://github.com/tbahsan/PacingPulse/actions/workflows/pages.yml/badge.svg)](https://tbahsan.github.io/PacingPulse/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Tracking](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen)](docs/SCOPE.md)

---

## 🚀 Live Demo / লাইভ ডেমো

Experience PacingPulse live in your browser:  
👉 **[https://tbahsan.github.io/PacingPulse/](https://tbahsan.github.io/PacingPulse/)**

---

## 📖 The Philosophy of Cadence

> *"This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety.*  
>  
> *Now listen. I vary the sentence length, and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes, when I am certain the reader is rested, I will engage him with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo..."*  
> — **Gary Provost**, *100 Ways to Improve Your Writing* (1985)

Good prose isn't merely about vocabulary; it is about **rhythm**. When every sentence has identical length, readers disconnect. When tempo surges and slows dynamically, prose pulls the reader forward effortlessly.

**PacingPulse** maps the rhythm of your narrative in real time.

---

## ✨ Key Features / প্রধান বৈশিষ্ট্যসমূহ

- 📊 **Interactive SVG Cadence Chart**: Visualizes sentence length as color-coded pulse bars with an optional moving-average trendline.
- 🔗 **Bidirectional Sync**: Hovering or clicking any bar in the chart instantly highlights and scrolls to that sentence in the text editor.
- ⚡ **Cadence Diversity Index**: Computes the Standard Deviation ($\sigma$) of sentence lengths to measure narrative variety.
- 🚨 **Drone & Monotony Detector**: Automatically detects consecutive runs of identically lengthed sentences, staccato clusters, and runaway marathon periods.
- 📚 **Built-in Rhythm Presets**: Includes Gary Provost's rhythm masterclass, high-tempo chase fiction, and lyrical atmospheric prose.
- 💾 **Data Export**: Export your complete pacing breakdown as CSV (sentence index, word count, character count, rhythm category, text) or clean TXT.
- 🔒 **100% Private & Offline**: Zero servers, zero telemetry, no AI APIs. Runs entirely in your browser as an offline-capable PWA.
- 🌓 **Dark & Light Modes**: High-contrast, WCAG 2.1 AA accessible theme designed for long writing sessions.

---

## 🗂️ Rhythm Classification

| Category | Length | Narrative Feeling | Color Code |
| :--- | :--- | :--- | :--- |
| **Short** | $\le 7$ words | Punchy, urgent, climax, staccato | Cyan (`#38bdf8`) |
| **Medium** | $8$ to $20$ words | Balanced, expository, conversational | Emerald (`#22c55e`) |
| **Long** | $21$ to $35$ words | Elaborate, complex, descriptive | Purple (`#a855f7`) |
| **Marathon** | $36+$ words | Sweeping, lyrical crescendo | Rose (`#f43f5e`) |

---

## 🛠️ Quick Start / লোকাল সেটআপ

```bash
# Clone the repository
git clone https://github.com/tbahsan/PacingPulse.git
cd PacingPulse

# Install dependencies
npm install

# Start development server
npm run dev

# Run unit & integration tests
npm test

# Build production bundle
npm run build
```

---

## 📚 Technical Documentation

- [Project Scope & Boundaries](docs/SCOPE.md)
- [Linguistic Rules & Heuristics](docs/RULES.md)
- [Data Sources & Sample Attributions](docs/DATA_SOURCES.md)
- [Evaluation & Test Strategy](docs/EVALUATION.md)
- [Accessibility Compliance (a11y)](docs/ACCESSIBILITY.md)
- [Deployment Guide](docs/DEPLOY.md)

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

Developed with care by **[Tasneem Bin Ahsan](https://github.com/tbahsan)**.
