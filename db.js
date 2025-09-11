import * as SQLite from 'expo-sqlite';

let db;

export const initDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('violations.db');
  }
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS violations (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      photoUri TEXT NOT NULL,
      date INTEGER NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      isSynced INTEGER NOT NULL
    );
  `);
};

export const insertViolation = async (title, description, photoUri, date, latitude, longitude) => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('violations.db');
  }

  await db.runAsync(
    `INSERT INTO violations (title, description, photoUri, date, latitude, longitude, isSynced)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, photoUri, date, latitude, longitude, 0]
  );
};

export const fetchViolations = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('violations.db');
  }

  const rows = await db.getAllAsync(`SELECT * FROM violations`);
  return rows;
};

export const fetchUnsyncedViolations = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('violations.db');
  }
  const rows = await db.getAllAsync(`SELECT * FROM violations WHERE isSynced = 0`);
  return rows;
};
export const updateViolationSyncStatus = async (id) => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('violations.db');
  }

  await db.runAsync(`UPDATE violations SET isSynced = 1 WHERE id = ?`, [id]);
};
export const deleteViolation = async (id) => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('violations.db');
  }

  await db.runAsync(`DELETE FROM violations WHERE id = ?`, [id]);
};
