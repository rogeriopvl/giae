# GIAE

Node.js library wrapping the [GIAE platform](https://www.giae.pt) API. Authored
to serve the maintainer's own needs — coverage is intentionally partial.

## Stack

- ESM-only (`"type": "module"` in `package.json`) — use `import`/`export`, never
  `require`.
- HTTP via [`got`](https://github.com/sindresorhus/got) v13.
- Cookie-based session via [`tough-cookie`](https://github.com/salesforce/tough-cookie);
  the jar is a singleton in `lib/cookie-jar.js`.
- Tests via [`ava`](https://github.com/avajs/ava) with [`nock`](https://github.com/nock/nock)
  for HTTP mocking.
- Formatting via Prettier (`singleQuote: true`, `printWidth: 80`); ESLint
  extends `prettier` and enforces it as an error.

## Layout

- `index.js` — public entry. Accepts config, calls `setConfig`, returns an
  object exposing the supported endpoint methods.
- `endpoints/<name>.js` — one file per GIAE endpoint. Builds the request body
  and delegates to `lib/request.js`. Default-exports the endpoint's methods.
- `lib/config.js` — module-scoped config singleton (`getConfig`/`setConfig`).
- `lib/request.js` — shared HTTP helper exposing `{ post, get }`. Reads config,
  applies the cookie jar, and honors `disableCertificateValidation` via
  `https.rejectUnauthorized`.
- `test/<name>.test.js` — one ava file per endpoint.

## Conventions

- New endpoints go under `endpoints/`, post to GIAE via `lib/request.js`, and
  must be wired into `index.js` to be reachable from the public API.
- GIAE expects Portuguese parameter names (`escola`, `nrcartao`, `codigo`,
  `modo`, `acao`, `IdTurma`, `IdDisciplina`, …). Preserve the original casing
  when adding new params — the server is case-sensitive.
- All date values sent to GIAE are strings in `dd-mm-yyyy` format (e.g.
  `25-04-2026`). Do not use ISO `YYYY-MM-DD` — the server will not accept it.
- Most GIAE endpoints are `POST` with a JSON body, even for read-only
  operations. The known exception is `/saldo`, which is `GET` — use
  `request.get` for it and `request.post` for the rest.
- `login()` must be called explicitly before any authenticated endpoint; the
  session cookie is then reused automatically via the shared jar.
- `disableCertificateValidation` exists because some school-hosted GIAE
  instances have broken HTTPS certs. Keep it opt-in and default to `false`.

## Commands

- `npm test` — runs the ava suite. CI runs the same on push (`.github/workflows`).
- There is no build step; this package is consumed as source ESM.

## When adding an endpoint

1. Create `endpoints/<name>.js` exporting one function per action.
2. Add a corresponding `test/<name>.test.js` using `nock` to assert the URL and
   request body — match the existing tests' shape.
3. Re-export the new methods from `index.js`.
4. Update `README.md`'s "Supported endpoints and operations" section.
