# Testing

## In this project

- Runner: Vitest (`pnpm test`), config in `vitest.config.ts`. Tests sit next to the code as `*.test.ts`.
- Covered: the `getHome` use case (ordering, limits, failure), the JSON Feed and Unsplash mappers (contract violations raise `UpstreamError`), environment configuration, and the photo URL and date helpers.
- Adapters are tested by stubbing `fetch`; no test talks to the network.
- UI is verified by running the production build against a local stub of both sources (see [`../operations/local-dev.md`](../operations/local-dev.md)) and checking light, dark, mobile and the photo viewer in a browser.

## Test pyramid

1. **Unit tests** — fast, isolated tests for domain logic and pure functions.
2. **Integration tests** — verify repositories, external-service clients, and API endpoints against real or test doubles.
3. **End-to-end tests** — verify critical user journeys through the full stack.

## Unit tests

- Place unit tests next to the source file or in a `__tests__` directory.
- Test domain invariants and edge cases thoroughly.
- Do not test framework code.

## Integration tests

- Use a test database or in-memory equivalent.
- Reset state between tests.
- Test the boundary between layers (e.g., repository mapping).

## End-to-end tests

- Cover the most important user journeys only.
- Keep them stable and fast enough to run in CI.
- Use deterministic test data.

## Test data

- Use factories, not fixtures, for test data.
- Avoid shared mutable state between tests.

## Naming

- Test descriptions should read like specifications: `it('rejects a negative amount')`.
- Group tests by behavior, not by method name.

## Coverage

- Aim for high coverage of domain and application layers.
- Do not chase 100% coverage at the expense of meaningful tests.
