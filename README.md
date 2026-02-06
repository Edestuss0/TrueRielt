# TrueRielt (RealEstate) — Fullstack demo

A small full-stack demo application: an Express JSON API (file-backed) and a React frontend (Vite).  
It shows a listings page with filters and a form for adding new property objects (images are uploaded as base64 strings).

Quick highlights:
- Backend: Node + Express, data stored in backend/data/objects.json
- Frontend: React (Vite), pages for listing and adding properties
- Default backend port: 3001. Frontend dev server (Vite) uses default port (usually 5173)

---

## Contents

- README
- backend/ — tiny Express API
  - server.js — GET /api/data and POST /api/data
  - data/objects.json — file datastore (seed data)
- frontend/ — Vite + React app
  - src/config.js — API base URL
  - src/pages/* and src/components/* — UI and logic

---

## Tech stack

- Backend: Node.js, Express, cors (no DB; uses a JSON file)
- Frontend: React, React Router, Vite
- Languages: JavaScript (ESM + JSX)

---

## Quickstart (development)

You run backend and frontend separately.

1. Backend
   - Open a terminal:
     ```
     cd backend
     npm install
     npm start
     ```
   - This runs `node server.js`. The API listens on:
     - http://localhost:3001
   - Endpoints:
     - GET /api/data
     - POST /api/data

2. Frontend
   - Open a second terminal:
     ```
     cd frontend
     npm install
     npm run dev
     ```
   - Vite will start (typically on http://localhost:5173). Open the URL printed by Vite.

Notes:
- The frontend uses the API base URL found in `frontend/src/config.js`:
  ```js
  export const API_URL = "http://localhost:3001";
  ```
  Change this if your backend runs elsewhere (e.g. production URL).
- CORS is enabled on the backend; the frontend and backend can run on different ports.

---

## API

Base URL: http://localhost:3001

- GET /api/data
  - Returns all stored objects (JSON array).
  - Example:
    ```
    curl http://localhost:3001/api/data
    ```
  - Response (excerpt):
    ```json
    [
      {
        "id": 1,
        "rooms": 3,
        "area": 120,
        "living": 45,
        "kitchen": 20,
        "floor": 2,
        "totalFloors": 5,
        "district": "centr",
        "address": "your-street",
        "cost": 250000,
        "title": "object 1",
        "description": "1",
        "phone": "+375291234567",
        "images": [
          "https://picsum.photos/300/200?1",
          "https://picsum.photos/300/200?2"
        ]
      }
    ]
    ```

- POST /api/data
  - Adds a new object to the JSON file. The server will append the object and add an `id` (Date.now()).
  - Content-Type: application/json
  - Example curl (here `images` can be an array of image URLs or base64 data URIs):
    ```bash
    curl -X POST http://localhost:3001/api/data \
      -H "Content-Type: application/json" \
      -d '{
        "rooms": 2,
        "area": 70,
        "living": 30,
        "kitchen": 12,
        "floor": 3,
        "totalFloors": 9,
        "district": "centr",
        "address": "Example St 1",
        "cost": 90000,
        "title": "Nice condo",
        "description": "A short description",
        "phone": "+123456789",
        "images": ["https://picsum.photos/300/200?5"]
      }'
    ```

- Notes
  - The backend performs no validation beyond a basic body presence check.
  - The server uses synchronous file read/write operations (fs.readFileSync / fs.writeFileSync) for simplicity.

---

## Data model (objects.json)

Each property object in `backend/data/objects.json` follows this shape:

- id: number (assigned by backend on POST)
- rooms: number (0 for studio)
- area: number (total area, m²)
- living: number (living area, m²)
- kitchen: number (kitchen area, m²)
- floor: number
- totalFloors: number
- district: string (e.g., "centr", "zapad")
- address: string
- cost: number (price)
- title: string
- description: string
- phone: string
- images: array of strings (URLs or base64 data URIs)

Example:
```json
{
  "rooms": 3,
  "area": 120,
  "living": 45,
  "kitchen": 20,
  "floor": 2,
  "totalFloors": 5,
  "district": "centr",
  "address": "your-street",
  "cost": 250000,
  "title": "object 1",
  "description": "Nice 3-room apartment",
  "phone": "+375291234567",
  "images": ["https://picsum.photos/300/200?1"]
}
```

---

## Frontend notes

- Pages:
  - `/` — Main page listing properties and the Filters panel (components/Filters.jsx)
  - `/add` — Add object page (pages/AddObjectPage.jsx) — converts chosen images to base64 and sends them in POST body
- Configuration:
  - Update `frontend/src/config.js` to change the API base URL.
  - Alternatively, you can set up a Vite proxy in `frontend/vite.config.js`:
    ```js
    // vite.config.js
    export default defineConfig({
      server: {
        proxy: {
          '/api': 'http://localhost:3001'
        }
      }
    })
    ```
    With this proxy you can keep API_URL as `/api` or use the absolute URL; adjust accordingly.

---

## Development & debugging tips

- Port conflicts:
  - If the backend port 3001 is already in use, either stop the process using it or change the port in `backend/server.js`.
- JSON file corruption:
  - If `backend/data/objects.json` becomes invalid JSON (e.g. manual editing), the API will throw a parse error on read. Restore from a copy or replace with a valid JSON array.
- Concurrency:
  - Using synchronous file writes is simple but not designed for concurrent writes in multi-user production use. For production, use a proper database (SQLite, PostgreSQL, MongoDB, etc.).
- Validation & security:
  - There is no input validation or authentication. Do not expose this server to the public unmodified.
- Reset seed data:
  - Replace `backend/data/objects.json` with the original seed content to reset dataset.

---

## Known issues & improvements

Short list of recommended improvements:
- Add validation (server-side) for incoming objects.
- Move from file-based storage to a real database.
- Add error handling and return proper error codes/messages on bad requests.
- Avoid synchronous fs operations; use asynchronous I/O or a DB.
- Add tests, linting rules, and CI.
- Add a build/deploy guide and environment variable configuration (e.g., NODE_ENV, custom port).

---

## Example: quick test with fetch (from browser console)

GET:
```js
fetch('http://localhost:3001/api/data')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(e => console.error(e));
```

POST:
```js
fetch('http://localhost:3001/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    rooms: 1, area: 40, living: 25, kitchen: 8,
    floor: 2, totalFloors: 5, district: 'centr',
    address: 'Test St 1', cost: 50000,
    title: 'Small flat', description: 'Cozy',
    phone: '+100000', images: ['https://picsum.photos/300/200?9']
  })
}).then(r => r.json()).then(console.log).catch(console.error);
```

---

## Contributing

- This is a small learning/demo project. If you want to contribute:
  - Open an issue describing the change.
  - Send a PR with small, focused changes and update README if needed.


If you want, I can:
- Generate a minimal root-level README.md file and open a PR text you can paste.
- Propose a simple Vite proxy configuration and a small Express change to make the API URL configurable via environment variable.
