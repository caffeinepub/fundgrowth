# Specification

## Summary
**Goal:** Add a static “Gold” offerings list section below the existing bond catalog on the Bonds page.

**Planned changes:**
- On route `/bonds`, render an additional section beneath the existing bond catalog grid (filters + bond cards).
- Display 5 offerings with the exact provided product names and detail strings (including punctuation, spacing around pipes, and the ₹ symbol), using English text only.
- Ensure the section uses standard UI elements (no emojis), works in light/dark themes, and is responsive on mobile and desktop.

**User-visible outcome:** When visiting `/bonds`, users see a new section below the bond catalog listing five Gold offerings with their corresponding details.
