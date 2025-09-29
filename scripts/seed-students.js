/* eslint-disable no-console */
const sqlite3 = require('sqlite3');

const dbPath = process.env.DB || 'G:\\db\\vki-web.db';

const students = [
  { first_name: 'Иван', last_name: 'Иванов', middle_name: 'Иванович', groupId: null },
  { first_name: 'Пётр', last_name: 'Петров', middle_name: 'Петрович', groupId: null },
  { first_name: 'Светлана', last_name: 'Сидорова', middle_name: 'Игоревна', groupId: null },
  { first_name: 'Мария', last_name: 'Кузнецова', middle_name: 'Олеговна', groupId: null },
  { first_name: 'Алексей', last_name: 'Смирнов', middle_name: 'Алексеевич', groupId: null },
];

function run() {
  console.log(`Using DB at: ${dbPath}`);
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run(
      'CREATE TABLE IF NOT EXISTS student (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, middle_name TEXT, groupId INTEGER)'
    );

    // Очистим текущие записи (если нужно — закомментируйте строку ниже)
    db.run('DELETE FROM student');

    const stmt = db.prepare('INSERT INTO student (first_name, last_name, middle_name, groupId) VALUES (?, ?, ?, ?)');
    for (const s of students) {
      stmt.run([s.first_name, s.last_name, s.middle_name || null, s.groupId ?? null]);
    }
    stmt.finalize((err) => {
      if (err) {
        console.error('Finalize error:', err);
      }
    });

    db.all('SELECT COUNT(*) as cnt FROM student', [], (err, rows) => {
      if (err) {
        console.error('Count error:', err);
        db.close();
        return;
      }
      console.log(`Inserted students: ${rows?.[0]?.cnt ?? 0}`);
      db.close();
    });
  });
}

run();




