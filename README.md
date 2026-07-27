# DINE AI

DINE AI is a restaurant operations demo with a clean split between the UI and API layers.

## Folder Structure

```text
Dine-AI/
├── backend/
│   ├── app.js
│   ├── controllers/
│   │   ├── dashboard.controller.js
│   │   └── menu.controller.js
│   ├── data/
│   │   └── demo-data.js
│   └── routes/
│       ├── dashboard.routes.js
│       ├── menu.routes.js
│       └── operations.routes.js
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── start-dev-3001.cmd
```

## Run

Start the frontend on `http://localhost:3001`:

```bash
npm run dev
```

Start the backend API on `http://localhost:4000`:

```bash
npm run backend
```

## API Routes

- `GET /api/dashboard`
- `GET /api/menu`
- `GET /api/operations`

## Checks

```bash
npm run typecheck
npm run lint
```
