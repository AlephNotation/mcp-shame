import { Database } from 'bun:sqlite';

export const db = new Database('shames.sqlite');

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

// Helper function to insert a new shame
export function insertShame(uuid: string, complaint: string) {
  const stmt = db.prepare('INSERT INTO shames (uuid, complaint) VALUES (?, ?)');
  return stmt.run(uuid, complaint);
}

// Helper function to get shames by UUID
export function getShamesByUuid(uuid: string) {
  return db.prepare('SELECT * FROM shames WHERE uuid = ? ORDER BY created_at DESC').all(uuid);
}

// Helper function to get all shames
export function getAllShames() {
  return db.prepare('SELECT * FROM shames ORDER BY created_at DESC').all();
}
