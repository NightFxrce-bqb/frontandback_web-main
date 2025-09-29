const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.join(__dirname, '..', 'db', 'vki-web.db');

// Создаем подключение к базе данных
const db = new sqlite3.Database(dbPath);

// SQL для создания таблицы групп (если не существует)
const createGroupsTable = `
  CREATE TABLE IF NOT EXISTS class (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )
`;

// SQL для создания таблицы студентов (если не существует)
const createStudentsTable = `
  CREATE TABLE IF NOT EXISTS student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    middleName TEXT NOT NULL,
    groupId INTEGER,
    FOREIGN KEY (groupId) REFERENCES class(id)
  )
`;

// Тестовые данные для групп
const insertGroups = `
  INSERT OR IGNORE INTO class (name) VALUES 
  ('2207 д1'),
  ('2207 д2'),
  ('2208 д1'),
  ('2208 д2'),
  ('2209 д1')
`;

// Тестовые данные для студентов
const insertStudents = `
  INSERT OR IGNORE INTO student (firstName, lastName, middleName, groupId) VALUES 
  ('Иван', 'Иванов', 'Иванович', 1),
  ('Петр', 'Петров', 'Петрович', 1),
  ('Сидор', 'Сидоров', 'Сидорович', 2),
  ('Мария', 'Иванова', 'Петровна', 2),
  ('Анна', 'Петрова', 'Сидоровна', 3),
  ('Елена', 'Сидорова', 'Ивановна', 3),
  ('Алексей', 'Козлов', 'Александрович', 4),
  ('Дмитрий', 'Новиков', 'Дмитриевич', 4),
  ('Ольга', 'Морозова', 'Алексеевна', 5),
  ('Татьяна', 'Волкова', 'Дмитриевна', 5)
`;

// Выполняем создание таблиц и вставку данных
db.serialize(() => {
  console.log('Создание таблиц...');
  
  db.run(createGroupsTable, (err) => {
    if (err) {
      console.error('Ошибка создания таблицы групп:', err);
    } else {
      console.log('Таблица групп создана успешно');
    }
  });

  db.run(createStudentsTable, (err) => {
    if (err) {
      console.error('Ошибка создания таблицы студентов:', err);
    } else {
      console.log('Таблица студентов создана успешно');
    }
  });

  console.log('Вставка тестовых данных...');
  
  db.run(insertGroups, (err) => {
    if (err) {
      console.error('Ошибка вставки групп:', err);
    } else {
      console.log('Тестовые группы добавлены успешно');
    }
  });

  db.run(insertStudents, (err) => {
    if (err) {
      console.error('Ошибка вставки студентов:', err);
    } else {
      console.log('Тестовые студенты добавлены успешно');
    }
  });

  console.log('Инициализация базы данных завершена!');
});

// Закрываем подключение
db.close((err) => {
  if (err) {
    console.error('Ошибка закрытия базы данных:', err);
  } else {
    console.log('Подключение к базе данных закрыто');
  }
});
