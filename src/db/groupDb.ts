import sqlite3 from 'sqlite3';

import type GroupInterface from '@/types/GroupInterface';

sqlite3.verbose();

export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const groups = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM class';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });

  return groups as GroupInterface[];
};

/**
 * Создание новой группы
 * @param name название группы
 * @returns Promise<GroupInterface>
 */
export const createGroupDb = async (name: string): Promise<GroupInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const group = await new Promise((resolve, reject) => {
    db.run('INSERT INTO class (name) VALUES (?)', [name], function(err) {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve({ id: this.lastID, name });
      db.close();
    });
  });

  return group as GroupInterface;
};

/**
 * Обновление группы
 * @param id ID группы
 * @param name новое название группы
 * @returns Promise<GroupInterface>
 */
export const updateGroupDb = async (id: number, name: string): Promise<GroupInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise((resolve, reject) => {
    db.run('UPDATE class SET name = ? WHERE id = ?', [name, id], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve({ id, name });
      db.close();
    });
  });

  return { id, name };
};

/**
 * Удаление группы
 * @param id ID группы
 * @returns Promise<number>
 */
export const deleteGroupDb = async (id: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise((resolve, reject) => {
    db.run('DELETE FROM class WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(id);
      db.close();
    });
  });

  return id;
};
