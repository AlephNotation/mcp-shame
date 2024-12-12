import { Database } from "bun:sqlite";
import { join } from "path";

// Use the persistent mount directory for the database file
const dbPath = join(
  process.env.NODE_ENV === "production" ? "/app/data" : ".",
  "shames.sqlite"
);
export const db = new Database(dbPath);

// Initialize the database with our schema
db.run(`
  CREATE TABLE IF NOT EXISTS shames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL,
    complaint TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create an index on uuid for faster lookups
db.run(`
  CREATE INDEX IF NOT EXISTS idx_shames_uuid ON shames(uuid)
`);

// Helper functions
export function insertShame(uuid: string, complaint: string) {
  const stmt = db.prepare("INSERT INTO shames (uuid, complaint) VALUES (?, ?)");
  return stmt.run(uuid, complaint);
}

export function getAllShames() {
  return db.prepare("SELECT * FROM shames ORDER BY created_at DESC").all();
}

export function getShamesByUuid(uuid: string) {
  return db
    .prepare(
      "SELECT * FROM shames WHERE uuid = ? ORDER BY created_at DESC LIMIT 25"
    )
    .all(uuid);
}
