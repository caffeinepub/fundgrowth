# Specification

## Summary
**Goal:** Replace the existing FUNDGROWTH site logo with the user-uploaded `logo.png` while keeping the same public asset path.

**Planned changes:**
- Update the static asset at `frontend/public/assets/generated/fundgrowth-logo.dim_512x192.png` to match the uploaded `logo.png`.
- Ensure all areas that render the logo (header, footer, and marketing pages) continue to reference `src="/assets/generated/fundgrowth-logo.dim_512x192.png"` and display the updated image.

**User-visible outcome:** The updated logo appears consistently across the site (including header, footer, and marketing pages), and the deployed logo URL serves the new image.
