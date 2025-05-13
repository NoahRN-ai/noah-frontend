# Noah Frontend

## Project Structure (Post-Refactor)

```
noah-frontend/
├── public/                # Static files (index.html, favicon, etc.)
├── src/                   # All source code
│   ├── api/               # API clients/services (e.g., supabase)
│   ├── assets/            # Static assets (images, fonts, etc.)
│   ├── components/        # Reusable UI components, organized by feature
│   │   ├── chat/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── documents/
│   │   ├── homepage/
│   │   │   ├── chatbot/
│   │   │   └── sections/
│   │   ├── layout/
│   │   │   └── header/
│   │   ├── learning/
│   │   ├── shared/
│   │   └── ui/
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route-level components (pages)
│   │   └── auth/
│   ├── shared/            # Shared utilities (e.g., cn function)
│   ├── styles/            # CSS/Tailwind files
│   └── utils/             # (Legacy) Utility functions and helpers
├── tests/                 # Unit tests, mirrors src/ structure
├── .github/               # GitHub workflows and configs
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── PLANNING.md            # Project planning and architecture
├── TASK.md                # Task tracking
└── ...                    # Other config and meta files
```

## Key Principles
- **Feature-based modularity**: Components grouped by feature/domain.
- **API/services layer**: All backend integrations (e.g., Supabase) are in `src/api/`.
- **Shared utilities**: Common helpers (e.g., `cn`) are in `src/shared/`.
- **Separation of concerns**: Pages, components, context, utils, and styles are clearly separated.
- **Scalability**: Structure supports growth and maintainability.

## Environment Variables
- All sensitive keys (e.g., Supabase) should be stored in `.env` files and loaded via Vite.
- Example:
  ```env
  VITE_SUPABASE_URL=your-url
  VITE_SUPABASE_ANON_KEY=your-key
  ```

## How to Run
1. `npm install`
2. `npm run dev`

## How to Test
- All tests are in `tests/`, mirroring the `src/` structure.
- Run tests with: `npm test`

---
For more details, see `PLANNING.md` and `TASK.md`. 