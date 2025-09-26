const db = require('./db');
db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS alumni(
    user_id INTEGER UNIQUE,
    name TEXT, email TEXT, year_of_passing TEXT,
    sector TEXT, achievements TEXT, reminders INTEGER)`);
  db.run(`CREATE TABLE IF NOT EXISTS reviews(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT, role TEXT, text TEXT)`);
});
console.log('DB initialized');
process.exit(0);
