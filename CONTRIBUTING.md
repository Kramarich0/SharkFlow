# Development Guide & Quality Standards

## Local Setup & Testing
To initialize the development environment, ensure you have Node.js installed.
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Execute the linter: `npm run lint`
4. Run the production build: `npm run build`

The repository utilizes `vite` for the build pipeline. All runtime configuration is managed via `vite.config.js` and `jsconfig.json`.

## Pre-Commit Verification Checklist (Fragile Zones)
Before committing, verify changes in these high-churn or high-dependency modules:
- [ ] [[src/lib/http/http.js]]: Warning: Primary network interface. Action: Verify that any change here does not break the `authInterceptor.js` or `apiClient.js` flow.
- [ ] [[src/store/modalsStore.js]]: Warning: Central state for UI modals. Action: Check for race conditions in UI state updates.
- [ ] [[src/validators/confirmCodeSchema.js]]: Warning: Tight coupling with security-sensitive inputs. Action: Ensure validation logic remains consistent across all consuming modals.
- [ ] [[package.json]]: Warning: High churn. Action: Ensure no breaking dependency versions are introduced.

## Pre-Commit Security Checks
- **Secrets Validation**: Scan for hardcoded credentials. Use environment variables for all API keys.
- **Input Sanitization**: Ensure all user inputs processed by [[src/validators/confirmCodeSchema.js]] or [[src/features/user/validators/registerSchema.js]] are sanitized using `dompurify` (as listed in [[package.json]]).
- **Authentication Flow**: Any modification to [[src/lib/http/authInterceptor.js]] or OAuth providers (e.g., [[src/features/auth/api/github/GitHubOAuthProvider.jsx]]) must be reviewed for potential CSRF or Token leakage vulnerabilities.

## PR Quality Standards & Review Gates
- **Documentation**: Any new API route added to [[src/features/auth/api/]] or [[src/features/boards/api/]] must be documented in the corresponding `index.js` file.
- **Coverage**: New features must include tests using `@playwright/test` (if applicable) or unit tests.
- **Branch Naming**: Use `feature/`, `fix/`, or `refactor/` prefixes.
- **Review**: All PRs require at least one approval from a maintainer.

## Change Playbooks

### Adding a New API Route
1. Identify the feature directory (e.g., `src/features/boards/api/`).
2. Create the new handler file (e.g., `myNewRoute.js`).
3. Export the handler and add it to the corresponding `index.js` in that directory.
4. Ensure the new route is registered in the appropriate `routes.js` or feature entry point.
5. If the route requires authentication, import and use the standard `http` client from [[src/lib/http/http.js]].

### Refactoring a Modal
1. Locate the modal in [[src/features/user/modals/]] or [[src/features/auth/modals/]].
2. Ensure state management is handled via `zustand` as defined in [[src/store/modalsStore.js]].
3. If the modal requires data, utilize the existing `TanStack Query` hooks (e.g., [[src/features/boards/hooks/useGetBoards.js]]).
4. Update the `ModalManager.jsx` [[src/common/ui/feedback/ModalManager.jsx]] if a new modal type is introduced.

### Modifying Global HTTP Configuration
1. Any changes to headers, base URLs, or interceptors must be performed in [[src/lib/http/http.js]].
2. If adding a new interceptor, define it in the `src/lib/http/` directory and register it in the HTTP client setup.