# SmartDine AI

SmartDine AI is a restaurant management platform built with React, TypeScript, Vite, Tailwind CSS, Express, and the Google Gemini API. It provides separate customer and restaurant-operations experiences in one application.

The project is intended for local development, demonstrations, and prototype restaurant workflows. Application data is held in server memory and is reset when the server restarts; it is not a production database-backed system yet.

## Features

### Customer portal

- Browse the digital restaurant experience and menu.
- View restaurants and menu items.
- Create and track orders.
- Choose dine-in, pickup, or delivery ordering flows.
- Make and cancel table reservations.
- View favorites, loyalty rewards, wallet, saved addresses, and support areas.
- Submit feedback and receive AI-assisted responses.
- Use customer settings and account preferences.

### Restaurant operations portal

- Dashboard with restaurant activity and operational metrics.
- Order management and order-status updates.
- Kitchen and chef workflow for queued, cooking, and completed orders.
- Digital waiter notifications and table-service actions.
- Billing and payment workflow.
- Delivery partner workflow and rider assignment.
- Menu creation, editing, and deletion.
- Reservation management.
- Inventory management, stock alerts, waste tracking, and recipe assistance.
- Staff management, attendance, shifts, and performance information.
- Reports and analytics.
- AI assistant for operational questions.
- AI-generated business reports.
- Restaurant and system settings.
- Reset-day action for demonstration data.

## Technology stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4
- **Icons and UI:** Lucide React, Motion
- **Charts:** Recharts
- **Backend:** Express 4 with TypeScript executed by `tsx`
- **AI:** Google Gemini through `@google/genai`
- **Build:** Vite and esbuild

## Requirements

Install the following before starting:

- Node.js 18 or newer
- npm
- A Google Gemini API key for AI assistant, feedback, recipe, and business-report features

Check your installed versions:

```powershell
node --version
npm --version
```

## Installation

Open PowerShell and run:

```powershell
cd "C:\Users\ASUS\Desktop\Suvin\Freelancing\Project\Restaurant Management System\smartdine-ai"
npm install
```

## Environment configuration

The server reads environment variables using `dotenv` from a local `.env` file.

1. Copy the example file:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Open `.env`:

   ```powershell
   notepad .env
   ```

3. Replace the placeholder with your own Gemini API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

`GEMINI_API_KEY` is required for Gemini-powered features. The main restaurant UI and non-AI demo workflows can still be explored without a key, but AI requests will not work.

Never commit `.env` or share your API key. The repository ignores `.env` files while keeping `.env.example` available as a template.

## Run in development mode

Start the full application with:

```powershell
npm run dev
```

The development server starts on:

```text
http://localhost:3000
```

Open that URL in a browser. The server provides the Express API and Vite development frontend from the same port.

Press `Ctrl + C` in the terminal to stop the server.

## Production build and start

Create a production build:

```powershell
npm run build
```

This command:

1. Builds the React frontend with Vite.
2. Bundles `server.ts` into `dist/server.cjs`.

Start the built application:

```powershell
npm start
```

The production server is available at:

```text
http://localhost:3000
```

Set `GEMINI_API_KEY` in `.env` before starting if production AI features are needed.

## Available npm scripts

| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Run the Express server with Vite development middleware |
| `npm run build` | Build the frontend and bundle the production server |
| `npm start` | Start the bundled production server |
| `npm run lint` | Run the TypeScript compiler without emitting files |
| `npm run clean` | Remove the `dist` directory; this script uses `rm -rf` and is intended for Unix-like shells |

On Windows PowerShell, remove the generated build directory with:

```powershell
Remove-Item -Recurse -Force .\dist
```

## Application API

The Express server exposes the following main endpoint groups:

### State and data

- `GET /api/state` - Retrieve current application state.
- `POST /api/orders` - Create an order.
- `PUT /api/orders/:id` - Update an order.
- `DELETE /api/orders/:id` - Delete an order.
- `POST /api/orders/:id/status` - Update order status.
- `POST /api/orders/:id/assign-rider` - Assign a delivery rider.
- `POST /api/reservations` - Create a reservation.
- `PUT /api/reservations/:id` - Update a reservation.
- `DELETE /api/reservations/:id` - Delete a reservation.
- `POST /api/reservations/:id/cancel` - Cancel a reservation.

### Menu, inventory, and staff

- `POST /api/menu` - Add a menu item.
- `PUT /api/menu/:id` - Update a menu item.
- `DELETE /api/menu/:id` - Delete a menu item.
- `POST /api/inventory` - Add an inventory item.
- `PUT /api/inventory/:id` - Update an inventory item.
- `DELETE /api/inventory/:id` - Delete an inventory item.
- `POST /api/inventory/update` - Update stock.
- `POST /api/recipes` - Generate recipe or inventory assistance.
- `POST /api/staff` - Add a staff member.
- `PUT /api/staff/:id` - Update a staff member.
- `DELETE /api/staff/:id` - Delete a staff member.
- `POST /api/staff/attendance` - Update staff attendance.

### Service operations

- `POST /api/waiter/notifications/:id/serve` - Mark a waiter notification as served.
- `POST /api/bills/:id/pay` - Pay a bill.
- `PUT /api/bills/:id` - Update a bill.
- `DELETE /api/bills/:id` - Delete a bill.
- `POST /api/feedback` - Submit feedback and request AI sentiment handling.
- `POST /api/admin/reset-day` - Reset demonstration day data.

### AI

- `POST /api/ai/assistant` - Ask the restaurant AI assistant a question.
- `POST /api/ai/business-report` - Generate a business report from current operational data.

The frontend calls these endpoints directly using relative `/api/...` URLs, so no separate API URL is required for local development.

## Project structure

```text
smartdine-ai/
├── assets/                 # Static image and media assets
├── src/
│   ├── components/         # Customer and restaurant UI components
│   ├── App.tsx             # Application state and primary routing logic
│   ├── index.css           # Global styles and Tailwind entry styles
│   ├── main.tsx            # React application entry point
│   ├── menu_data.ts        # Initial menu data
│   └── types.ts            # Shared TypeScript domain types
├── .env.example            # Environment variable template
├── index.html              # HTML entry document
├── package.json            # Scripts and dependencies
├── server.ts               # Express API and Vite server
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite and Tailwind configuration
```

## Development workflow

1. Install dependencies with `npm install`.
2. Create `.env` from `.env.example`.
3. Add a valid `GEMINI_API_KEY`.
4. Start the server with `npm run dev`.
5. Make changes in `src/` or `server.ts`.
6. Run type checking before sharing changes:

   ```powershell
   npm run lint
   ```

7. Verify the production bundle:

   ```powershell
   npm run build
   ```

## Data and persistence limitations

This version uses in-memory state initialized by `server.ts`. As a result:

- Data is not persisted to a database.
- Restarting the server restores the initial demo state.
- Multiple server instances do not share data.
- The application should not be used with real customer, payment, or business data without adding authentication, authorization, persistence, validation, and production security controls.

## Troubleshooting

### `npm` or `node` is not recognized

Install Node.js from the official Node.js website, restart PowerShell, and verify:

```powershell
node --version
npm --version
```

### Port 3000 is already in use

Stop the process using port 3000, or close the other application before running SmartDine AI. The current server configuration uses port 3000 in `server.ts`.

### AI requests fail

Check that `.env` exists in the project root and contains a valid key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

After changing `.env`, restart `npm run dev`.

### Dependencies are missing

Remove and reinstall dependencies:

```powershell
Remove-Item -Recurse -Force .\node_modules
npm install
```

### The browser shows an empty page

Check the terminal for TypeScript or runtime errors, then run:

```powershell
npm run lint
npm run build
```

## Security notes

- Keep Gemini API keys in `.env`, never in source code.
- Do not commit `.env` or paste API keys into issues, screenshots, or chat messages.
- This project currently has demo-level authentication and in-memory state.
- Add server-side authentication and role-based authorization before deploying publicly.
- Add a real database and server-side validation before handling production data.
- Use HTTPS and secure secret management in production.

## License

No license has been specified for this project yet. Add a license before distributing or publishing it for reuse.
