# WebPush Service

A simple service for working with push notifications (backend + frontend).

## 🚀 Quick Start

### 1. Generate VAPID Keys

```bash
npm run generate:vapid
```

### 2. Create `.env`

Copy the example file:

```bash
cp example.env .env
```

Then fill it with the generated VAPID keys.

### 3. Start the services

```bash
npm run docker:up
```

### 4. Access

- **Frontend** → [http://localhost:4000](http://localhost:4000)
- **Backend** → [http://localhost:3000](http://localhost:3000)
- **Swagger Docs** → [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🛠 Tech Stack

- **Backend**: NestJS
- **Frontend**: Vite + React
- **Docker**: for quick environment setup
- **Web Push**: VAPID

---

## 📌 Notes

- After modifying `.env`, restart the services.
- VAPID keys are generated once and stored in `.env` and `vapid.json`.
