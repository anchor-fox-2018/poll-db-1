const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function () {
  db.run(`CREATE TABLE IF NOT EXISTS pejabat(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, partai TEXT, location TEXT,
        grade_current TEXT
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS hasilVote(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pejabatID INTEGER,
        votersID INTEGER,
        FOREIGN KEY (pejabatID) REFERENCES pejabat(id),
        FOREIGN KEY (votersID) REFERENCES voters(id)
  )`)
});
