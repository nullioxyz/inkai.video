# Inkai Frontend

Frontend for the Inkai platform (Next.js + TypeScript), focused on modular architecture, domain decoupling, authenticated route security, and continuous evolution with tests.

## Overview

This project is structured to:

- Keep components and modules independent.
- Reduce coupling between UI, business rules, and HTTP/realtime infrastructure.
- Enable fast backend-driven changes without rewriting entire screens.
- Ensure test coverage for critical rules.

## Stack

- `Next.js 16` (App Router)
- `React 19`
- `TypeScript`
- `Vitest` (unit tests)
- `ESLint`

## Architecture Principles

### 1. Domain-based separation

Code is organized by domain in `src/modules/*`:

- `auth`
- `videos`
- `presets`
- `credits`

Each domain contains:

- `application/`: pure business logic (use cases, mappers, state rules).
- `domain/`: contracts/abstractions (interfaces).
- `infra/`: concrete HTTP/realtime gateway implementation.

This allows replacing implementations (API, transport, response shape) without breaking domain consumers.

### 2. SRP (Single Responsibility Principle)

Each layer has a single responsibility:

- React component: rendering and user interaction.
- Use case (`application`): flow decisions and business rules.
- Gateway (`infra`): external communication.
- Helpers (`lib`): reusable isolated utilities.

Recent examples:

- `route-access.ts`: redirect/noindex decisions by route.
- `impersonation-hash.ts`: impersonation hash validation/normalization.
- `auth-cookie.ts`: session cookie generation.

### 3. Pluggability

Modules are instantiated through factories (e.g. `createAuthModule`, `createVideosModule`, `createPresetsModule`) and depend on contracts, not concrete implementations.

### 4. Component independence

Dashboard components work with view models (`types/dashboard` + module mappers), avoiding direct coupling with backend DTOs.

## Folder Structure

```txt
src/
  app/                      # routes and pages (App Router)
  components/               # UI components
  context/                  # global UI state (dashboard)
  lib/                      # HTTP client, session, shared utilities
  modules/
    dashboard/
      application/
      domain/
      infra/
    auth/
      application/
      domain/
      infra/
    videos/
      application/
      domain/
      infra/
      realtime/
    presets/
      application/
      domain/
      infra/
    credits/
      application/
```

## Backend Integration (iavideo)

### Authentication

- Login: `POST /api/auth/login`
- Me: `GET /api/auth/me`
- First login required password reset: `POST /api/auth/first-login/reset-password`
- Impersonation: `POST /api/auth/impersonation/exchange`

### Implemented flows

- Regular login with request context headers (`Accept-Language`, `X-Country-Code`, etc.).
- Mandatory first-login password reset flow (`must_reset_password`).
- Hash-based impersonation:
  - entry route: `/auth/impersonate?impersonation_hash=...`
  - backend token exchange
  - impersonated session persistence

### Videos

- Input creation
- Job listing
- Job/title rename
- Authenticated download endpoint usage
- Realtime updates (broadcasting)

## WebSocket / Realtime

Realtime updates are implemented with a dedicated gateway in:

- `src/modules/videos/realtime/echo-videos-realtime-gateway.ts`

### How it works

- The frontend subscribes to user-scoped channels after authentication.
- Authentication for private channels uses the backend broadcasting auth endpoint with bearer token.
- Incoming events are mapped to the same video view model pipeline used by HTTP responses.
- On each job update event, the dashboard updates local state and refreshes related credit data.

### Design choices

- Realtime transport is isolated behind a domain contract, so UI/components do not depend on Laravel Echo directly.
- HTTP and WebSocket flows converge into shared mappers/state reducers, keeping behavior consistent and testable.
- Polling remains as a fallback safety net for processing jobs, so users still get updates if realtime connection drops.

### Credits

- Balance
- Statement
- Paginated generation listing
- Audit event/sub-row rendering
- Dedicated credit view-model mappers in `src/modules/credits/application/mappers.ts`

## Security

### Authenticated route protection

Implemented in `middleware.ts`:

- User without token: cannot access `/dashboard/*` and `/first-login/*` (redirect to `/login`).
- User with token: when accessing `/login` or `/auth/*`, is redirected to `/dashboard`.

### Search engine indexing protection

Internal and auth routes receive header:

- `X-Robots-Tag: noindex, nofollow, noarchive`

Applied to:

- `/dashboard/*`
- `/first-login/*`
- `/login`
- `/auth/*`

### Session

- Token stored in `localStorage` + support cookie for middleware route checks.
- On `401/403` during dashboard load, session is automatically cleared.

## Performance and Re-render

Refactors applied in `DashboardProvider`:

- `useCallback` for effect/action functions (`fetchCredits`, `fetchJobs`, `createVideo`, etc.).
- `useMemo` for `contextValue`.

Result: fewer unnecessary reference changes and less rerender cascading across context consumers.

## Testing Strategy

### Tooling

- `Vitest` for unit tests.

### Domain coverage

- `auth/application`: login rules, post-login routing, first-login guard, impersonation, route access.
- `auth/infra`: HTTP gateway.
- `videos/application`: mappers, state, layout helpers.
- `videos/infra` and `videos/realtime`: gateways.
- `presets/application` and `presets/infra`: mappers and gateway integration.
- `credits/application`: table/pagination/audit rules.
- `lib/api`: client, auth, credits, cookies, login context.

### Current status

- Green test suite with broad unit coverage of critical authentication rules, route security, and core dashboard flows.

## Code Standards

- Explicit typing for API contracts and view models.
- Backend payload -> view model mapping in dedicated mappers.
- Flow rules implemented as pure, testable functions.
- Avoid business logic in visual components.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run lint:fix
npm run format
npm run format:check
```

## Environment Variables

Main variable:

- `NEXT_PUBLIC_IAVIDEO_API_URL`: iavideo backend base URL.

Examples available in:

- `.env.example`

## Decisions and Trade-offs

- `middleware` checks token presence (not cryptographic JWT validation in frontend). Real auth validation remains in backend.
- `localStorage` + cookie token persistence was chosen to balance client UX with edge middleware route protection.
- Simplicity with small independent modules was prioritized over deep abstraction.

## Recommended Next Steps

- Migrate session handling to server-set `HttpOnly` cookies (stronger XSS posture).
- Increase UI interaction coverage with React Testing Library for complex components.
- Continue extracting `DashboardProvider` orchestration into smaller hooks if state growth continues.
