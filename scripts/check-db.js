const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.join(__dirname, '..', 'db', 'vki-web.db');

// Создаем подключение к базе данных
const db = new sqlite3.Database(dbPath);

console.log('Проверка структуры базы данных...');

// Проверяем структуру таблицы student
db.all("PRAGMA table_info(student)", [], (err, rows) => {
  if (err) {
    console.error('Ошибка получения информации о таблице student:', err);
    return;
  }
  
  console.log('Структура таблицы student:');
  console.log(rows);
  
  // Проверяем, есть ли колонка firstName
  const hasFirstName = rows.some(row => row.name === 'firstName');
  const hasLastName = rows.some(row => row.name === 'lastName');
  const hasMiddleName = rows.some(row => row.name === 'middleName');
  const hasGroupId = rows.some(row => row.name === 'groupId');
  
  console.log('Проверка колонок:');
  console.log('firstName:', hasFirstName);
  console.log('lastName:', hasLastName);
  console.log('middleName:', hasMiddleName);
  console.log('groupId:', hasGroupId);
  
  if (!hasFirstName || !hasLastName || !hasMiddleName || !hasGroupId) {
    console.log('Таблица student имеет неправильную структуру. Пересоздаем...');
    
    // Удаляем старую таблицу и создаем новую
    db.run("DROP TABLE IF EXISTS student", (err) => {
      if (err) {
        console.error('Ошибка удаления таблицы student:', err);
        return;
      }
      
      console.log('Старая таблица student удалена');
      
      // Создаем новую таблицу с правильной структурой
      const createStudentsTable = `
        CREATE TABLE student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          middleName TEXT NOT NULL,
          groupId INTEGER,
          FOREIGN KEY (groupId) REFERENCES class(id)
        )
      `;
      
      db.run(createStudentsTable, (err) => {
        if (err) {
          console.error('Ошибка создания таблицы student:', err);
          return;
        }
        
        console.log('Новая таблица student создана');
        
        // Добавляем тестовые данные
        const insertStudents = `
          INSERT INTO student (firstName, lastName, middleName, groupId) VALUES 
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
        
        db.run(insertStudents, (err) => {
          if (err) {
            console.error('Ошибка вставки студентов:', err);
          } else {
            console.log('Тестовые студенты добавлены успешно');
          }
          
          // Проверяем данные
          db.all("SELECT * FROM student", [], (err, rows) => {
            if (err) {
              console.error('Ошибка получения студентов:', err);
            } else {
              console.log('Студенты в базе данных:');
              console.log(rows);
            }
            
            db.close();
          });
        });
      });
    });
  } else {
    console.log('Структура таблицы student корректна');
    
    // Проверяем данные
    db.all("SELECT * FROM student", [], (err, rows) => {
      if (err) {
        console.error('Ошибка получения студентов:', err);
      } else {
        console.log('Студенты в базе данных:');
        console.log(rows);
      }
      
      db.close();
    });
  }
});
