# Contributing

1. Create a focused branch.
2. Copy `.env.example` to `.env.local` and use non-production credentials.
3. Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.
4. Keep business rules in `lib/`, validate untrusted input, and enforce authorization on the server.
5. Never commit secrets or real customer/health information.
