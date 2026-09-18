# PacingPulse Accessibility (a11y) Conformance

## 1. Compliance Standard

PacingPulse is engineered to meet **WCAG 2.1 Level AA** standards:

- **Contrast Ratios**:
  - Dark mode text (`#f8fafc`) on dark card background (`#0f172a` / `#020617`): ratio $> 14:1$.
  - Light mode text (`#0f172a`) on card background (`#ffffff`): ratio $> 16:1$.
  - Accent colors (`#38bdf8`, `#22c55e`, `#f59e0b`, `#f43f5e`) exceed the 3:1 graphical element ratio requirement.

- **Non-Color Dependent Indicators**:
  - Sentence length is communicated through multiple redundant sensory channels: bar height, numeric label above each bar, category color, and tooltip preview.
  - Active and hovered states feature strong 2px solid boundary rings in addition to color changes.

- **Keyboard Navigability**:
  - Every interactive button (presets, copy, export, clear, theme toggle) is fully reachable via standard `Tab` / `Shift+Tab` keystrokes.
  - Visible focus indicators ensure clear visual tracking for keyboard-only users.

- **Screen Reader Support**:
  - SVG element contains `role="img"` and descriptive `aria-label="Sentence length bar chart"`.
  - Individual bar elements contain SVG `<title>` tags for tooltip readout.
  - Metric summary cards feature explicit semantic spans readable by assistive technology.
