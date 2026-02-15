# Specification

## Summary
**Goal:** Add dynamic “bond quick links” to the site header navigation (desktop and mobile) so users can jump directly to individual bond detail pages.

**Planned changes:**
- Update the header’s desktop navigation and mobile menu to include quick-access links for individual bonds that route to `/bonds/$bondId`.
- Populate the quick-link entries dynamically using the existing React Query bond listings hook (with IDs), matching existing BondCard navigation behavior with TanStack Router params.
- Add graceful loading/empty/error handling so the header remains usable when bond data is unavailable.
- Constrain and style the quick-link list to match the current header theme and remain scannable/usable with many bonds (e.g., scrollable or otherwise bounded list).

**User-visible outcome:** Users can open the header menu (desktop or mobile) and select a bond from a quick-access list to navigate directly to that bond’s detail page, without visiting the Bonds catalog first.
