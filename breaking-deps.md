# Breaking Dependencies

This file logs dependencies that were not updated because they contain breaking changes that would affect the project.

## @sparticuz/chromium (129.0.0 -> 143.0.4)

- **Breaking Change:** Removal of "opinionated" code. It no longer automatically sets default arguments, headless mode, or viewport.
- **Affected File:** `models/screenshot.ts`
- **Reason:** Upgrading would require manual adjustment of the Puppeteer launch configuration to explicitly include `puppeteer.defaultArgs()` and other settings that were previously handled by the package.

## puppeteer-core (23.5.1 -> 24.40.0)

- **Breaking Change:** Major version jump. Puppeteer major releases often include breaking changes in the API or supported browser versions.
- **Affected File:** `models/screenshot.ts`
- **Reason:** Significant major version jump that requires verification of all browser-related logic.
