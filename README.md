# Integrant Vue Website

A Vue 3 + TypeScript + Vite marketing site for Integrant.

## Prompt Guide (for best results)

Use the following structure when asking an AI assistant to make changes in this repository.

### 1) Start with the goal
- What you want changed.
- Why the change is needed.
- What "done" looks like.

Example:
> "Convert the header navigation to route-based pages so each nav item has its own URL and active state."

### 2) Add scope boundaries
- Files/components that may be changed.
- Files/components that must stay untouched.
- Whether refactoring is allowed.

Example:
> "Only update `src/components/AppHeader.vue` and `src/router/index.ts`; avoid unrelated refactors."

### 3) Define behavior requirements
List exact expected behavior in bullet points.

Example:
- Desktop and mobile nav must both work.
- Active link style must be preserved.
- No hash/anchor section scrolling.

### 4) Ask for validation
Require concrete verification steps.

Example:
- Run `npm run build`.
- Provide a short manual QA checklist.
- If UI changed, include a screenshot.

### 5) Request output format
Ask the assistant to return:
- Summary of issue.
- Files changed.
- Code diff or key snippets.
- Brief explanation of tradeoffs.

---

## High-quality prompt template

```text
Task:
[Describe the change clearly in one or two sentences]

Context:
- Tech stack: Vue 3 + TypeScript + Vite
- Relevant files: [list files]
- Current behavior: [what happens now]
- Desired behavior: [what should happen]

Constraints:
- Keep UI unchanged unless requested
- Avoid unnecessary refactors
- Update only impacted files
- Remove dead/unused code if touched

Validation:
- Run: npm run build
- Provide manual test steps
- Include screenshot if UI-visible change

Return:
- Summary
- Changed files
- Updated code snippets
- Short explanation
```

## Prompt examples

### Example A: Navigation
```text
Change the navbar from section anchors to route-based pages.

Requirements:
- Replace anchor scrolling with RouterLink routes
- Keep current desktop/mobile layout
- Add/keep active link styling
- Update only impacted files
- Remove unused section-scroll handlers

Validation:
- npm run build
- Click through all header links and confirm route changes
```

### Example B: Bug fix
```text
Fix the mobile menu not closing after selecting a nav item.

Requirements:
- Keep existing styles/animations
- Close menu on route navigation and logo click
- No broad refactor

Validation:
- npm run build
- Manual check on mobile viewport
```

## Project scripts

- `npm run dev` — start local dev server
- `npm run build` — type-check and production build
- `npm run preview` — preview production build

## Tech stack

- Vue 3
- Vue Router
- TypeScript
- Vite
- Tailwind CSS
