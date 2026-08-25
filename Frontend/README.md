# NOVA TB — Frontend

React 19 + Vite. Consume el backend en `VITE_API_URL`.

## Arranque

```bash
cd Frontend
npm install
npm run dev
```

Backend (otra terminal):

```bash
cd Backend
npm install
node server.js
```

## Variables

Copia `.env.example` → `.env`:

```
VITE_API_URL=http://localhost:3000
```

## Rutas principales

| Ruta | Acceso |
|------|--------|
| `/` | Público |
| `/productos` | Público (búsqueda y categorías) |
| `/productos/:id` | Público |
| `/login`, `/registro` | Auth |
| `/recuperar-contrasena` | Auth |
| `/carrito` | Cliente autenticado |
| `/perfil` | Autenticado |
| `/proveedor/*` | Rol proveedor |

## Notas

- Favoritos: solo `localStorage`, sin backend.
- Imágenes de productos del proveedor: URL pública.
- Categorías esperadas: Tecnología y Deporte.
