// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import fs from 'fs';

// let db;

// async function initializeDatabase() {
//   const dbPath = './userInfo.sqlite';
  
//   console.log('Initializing database...');

//   try {
//     // Check if the database file exists
//     if (!fs.existsSync(dbPath)) {
//       console.log('Database file does not exist. Creating new file.');
//       fs.writeFileSync(dbPath, '');
//     }

//     db = await open({
//       filename: dbPath,
//       driver: sqlite3.Database
//     });

//     console.log('Database connection established.');

//     await db.exec(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         phone TEXT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     console.log('Users table created or already exists.');

//     // Test the database connection
//     const testResult = await db.get('SELECT 1 as test');
//     if (testResult.test === 1) {
//       console.log('Database is working correctly.');
//     }

//   } catch (error) {
//     console.error('Error initializing database:', error);
//     throw error; // Re-throw the error to be caught by the caller
//   }
// }

// const handleUserInfo = async (req, rep) => {
//     const userInfo = req.body;
//     const {name, email, phone} = userInfo;
//     console.log('user info:', userInfo);

//     try {
//       if (!db) {
//         await initializeDatabase();
//       }

//       const result = await db.run(
//         'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
//         [name, email, phone]
//       );
  
//       if (result.changes > 0) {
//         rep.status(201).json({ message: 'User info saved successfully', userId: result.lastID });
//       } else {
//         rep.status(500).json({ error: 'Failed to save user info' });
//       }
//     } catch (error) {
//       console.error('Error saving user info:', error);
//       if (error.code === 'SQLITE_CONSTRAINT') {
//         rep.status(409).json({ error: 'Email already exists' });
//       } else {
//         rep.status(500).json({ error: 'Internal server error' });
//       }
//     }
// };

// export { initializeDatabase, handleUserInfo };