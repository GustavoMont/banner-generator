# Breaking Dependencies

This file logs dependencies that were not updated because they contain breaking changes that would affect the project.

## @sparticuz/chromium (129.0.0 -> 143.0.4)
- **Breaking Change:** Removal of "opinionated" code. It no longer automatically sets default arguments, headless mode, or viewport.
- **Affected File:** `models/screenshot.ts`
- **Reason:** Upgrading would require manual adjustment of the Puppeteer launch configuration to explicitly include `puppeteer.defaultArgs()` and other settings that were previously handled by the package.

## @types/node (20.16.11 -> 25.5.0)
- **Breaking Change:** Major version jump (v20 to v25). This aligns with Node.js major versions and may include removals of deprecated APIs and changes in type definitions that could break compilation.
- **Reason:** The project currently runs on Node 20. Upgrading types to v25 while staying on Node 20 runtime is risky without exhaustive testing.

## @types/react (18.3.11 -> 19.2.14) & @types/react-dom (18.3.0 -> 19.2.3)
- **Breaking Change:** Major version jump to React 19 types. Includes removals of deprecated types (like `React.FC` automatic children), changes in `Ref` types, and strictness improvements.
- **Reason:** While the project uses React 19, the current code might rely on React 18 type definitions. Upgrading would require a full codebase review for type compatibility.

## eslint (8.57.1 -> 10.1.0) & eslint-config-next (14.2.14 -> 16.2.1)
- **Breaking Change:** ESLint 9+ introduces "Flat Config" as the default and removes support for `.eslintrc.json` (requires migration to `eslint.config.js`).
- **Affected File:** `.eslintrc.json`
- **Reason:** Upgrading would require a complete migration of the ESLint configuration and potentially all related plugins.

## puppeteer-core (23.5.1 -> 24.40.0)
- **Breaking Change:** Major version jump. Puppeteer major releases often include breaking changes in the API or supported browser versions.
- **Affected File:** `models/screenshot.ts`
- **Reason:** Significant major version jump that requires verification of all browser-related logic.

## tailwindcss (3.4.13 -> 4.2.2)
- **Breaking Change:** Tailwind CSS v4 is a major rewrite. It moves to a CSS-first configuration, removes `tailwind.config.js` by default, and changes how directives like `@tailwind` and `@layer` are used.
- **Affected Files:** `tailwind.config.ts`, `styles/globals.css`
- **Reason:** Upgrading would require a complete migration of the styling configuration and CSS files.

## typescript (5.6.2 -> 6.0.2)
- **Breaking Change:** TypeScript 6.0 introduces major changes in defaults: `strict` is now `true` by default, `types` is empty by default, and legacy targets/resolutions are deprecated.
- **Affected File:** `tsconfig.json` and the entire codebase (due to strictness).
- **Reason:** Upgrading would likely surface numerous type errors and require significant configuration changes.
