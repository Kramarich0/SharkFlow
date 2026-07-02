# System Identity & Onboarding Blueprint

## Executive Summary
SharkFlow is a collaborative task management platform designed for efficiency and high-density information architecture. The system leverages a modern React-based stack, utilizing Zustand for state management, TanStack Query for data synchronization, and Vercel AI SDK for intelligent interaction handling. The architecture is modularized into discrete functional domains, ensuring high performance and maintainability through a clear separation of concerns between API client handling, UI components, and domain-specific business logic.

## Primary Entrypoints
*   [[src/lib/http/index.js]]: The centralized API gateway and HTTP client configuration. This is the foundation for all network requests.
*   [[src/App.jsx]]: The primary application entrypoint, managing routing, global state initialization, and component lifecycle.
*   [[src/main.jsx]]: The application bootstrap module, configuring the QueryClient for TanStack Query and the Google OAuth provider.
*   [[src/features/auth/api/github/GitHubOAuthProvider.jsx]]: An example of the OAuth integration pattern, demonstrating how the system handles external authentication flows.

## Knowledge Holders & Ownership Risks
*   **Engineering Lead:** unknown.
*   **Ownership Risks:** The system exhibits high dependency density in [[src/lib/http/http.js]] and [[src/store/modalsStore.js]]. These modules act as central bottlenecks for HTTP communication and modal state management, respectively. Any refactoring in these files carries a high risk of regression across the entire UI layer.

## Quick Start, Setup & Verification
### Prerequisites
*   Node.js (latest LTS recommended).
*   Package manager (npm/yarn/pnpm).

### Setup Instructions
1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash title="package.json"
    npm install
    ```
3.  **Environment Configuration:** Ensure all `VITE_*` variables required by the application (e.g., API endpoints, OAuth client IDs) are defined in your local `.env` file, adhering to the structure defined in [[src/lib/http/apiClient.js]].

### Smoke Test / Verification
Verify the local build integrity by running the development server:
```bash title="package.json"
npm run dev
```
Validate connectivity by checking the browser console for successful API client initialization and ensuring the application loads at `http://localhost:5173`.

> [!NOTE]
> The project utilizes `vite-plugin-analyzer` (commented out in [[vite.config.js]]) for build performance auditing. Enable this if you suspect bundle bloat during development.

## Operating Model & Next Steps
The system operates on a configuration-driven runtime model. State is managed via Zustand stores located in [[src/store/]] and feature-specific directories. Networking is handled through a unified interceptor pattern in [[src/lib/http/]] to manage authentication tokens and logging.

**Recommended Review Path:**
1.  Review [[src/features/auth/]] to understand the authentication and authorization flow.
2.  Examine [[src/features/boards/]] to grasp the core data-driven task management logic.
3.  Study the utility modules in [[src/utils/]] for standardized data filtering and sorting patterns used throughout the application.