import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('violations.db');

export const initDb = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS violations (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          photoUri TEXT NOT NULL,
          date INTEGER NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          isSynced INTEGER NOT NULL
        );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

/**
 * Вставляє нове правопорушення в локальну базу даних.
 * За замовчуванням isSynced встановлюється в 0.
 * @param {string} title
 * @param {string} description
 * @param {string} photoUri
 * @param {number} date
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise}
 */
export const insertViolation = (title, description, photoUri, date, latitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO violations (title, description, photoUri, date, latitude, longitude, isSynced) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [title, description, photoUri, date, latitude, longitude, 0],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

/**
 * Отримує всі правопорушення з бази даних.
 * @returns {Promise<Array>}
 */
export const fetchViolations = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM violations;`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

/**
 * Отримує всі несинхронізовані правопорушення (isSynced = 0).
 * @returns {Promise<Array>}
 */
export const fetchUnsyncedViolations = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM violations WHERE isSynced = 0;`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

/**
 * Оновлює статус синхронізації для конкретного правопорушення.
 * @param {number} id
 * @returns {Promise}
 */
export const updateViolationSyncStatus = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE violations SET isSynced = 1 WHERE id = ?;`,
        [id],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};