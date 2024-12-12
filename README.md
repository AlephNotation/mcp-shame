# Shame Server

A simple server for recording and displaying "shames" - complaints or incidents tracked by UUID. Built with Bun, Hono, and SQLite.

## Features

- Record shames with UUID and complaint text
- View all shames in a paginated wall
- Query shames by UUID
- Persistent storage using SQLite
- Production-ready with Railway deployment support

## Prerequisites

- [Bun](https://bun.sh) v1.0.0 or higher

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd shame-server
```

2. Install dependencies:

```bash
bun install
```

## Development

Run the development server with hot reload:

```bash
bun dev
```

The server will start at http://localhost:3000

## Production

For production deployment:

```bash
bun start
```

### Railway Deployment

This project is configured for deployment on Railway with persistent storage. The database will be stored in a persistent volume mounted at `/app/data`.

Required environment variables:

- `NODE_ENV`: Set to "production"
- `PORT`: Default is 3000

## API Endpoints

### POST /shame

Record a new shame.

Request body:

```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "complaint": "Left dirty dishes in the sink"
}
```

### GET /shame

Get all recorded shames.

### GET /shame/:uuid

Get up to 25 most recent shames for a specific UUID.

### GET /health

Health check endpoint.

## Database Schema

```sql
CREATE TABLE shames (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT NOT NULL,
  complaint TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## License

[Your chosen license]

## Contributing

[Your contribution guidelines]
