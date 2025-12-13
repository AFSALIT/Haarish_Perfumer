
# Fix SSR Document Error in Navbar Component

## Problem
The navbar component uses `document` directly, causing "ReferenceError: document is not defined" during server-side rendering (SSR).

## Issues Identified
1. `document.querySelectorAll('.dropdown')` and `document.querySelectorAll('.nav-link')`
2. `document.body.style.overflow` manipulation
3. `document.querySelector('.icon-btn[title="Shopping Cart"]')`
4. `document.querySelector('.navbar')` 
5. `window.pageYOffset` without browser checks

## Solution Plan
1. Add `isPlatformBrowser` import and inject `PLATFORM_ID`
2. Replace direct document queries with ViewChild references where possible
3. Use Angular's Renderer2 for safe DOM manipulation
4. Add browser checks for window and document access
5. Update component logic to handle SSR properly


## Implementation Steps
- [x] Import required Angular modules (isPlatformBrowser, PLATFORM_ID)
- [x] Add platform detection to constructor
- [x] Replace document.querySelectorAll calls with proper element references
- [x] Use Renderer2 for body style manipulation with browser checks
- [x] Add browser checks for window object access
- [x] Test the component in both browser and SSR environments

## Files Edited
- `/Users/mac/Desktop/haarish_perfume/src/app/Components/navbar/navbar.ts` - ✅ Completed
