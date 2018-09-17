//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS politicians(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        party VARCHAR(1), 
        location VARCHAR(2),
        grade_current REAL
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR,
        last_name VARCHAR,
        gender VARCHAR,
        age INTEGER
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        politician_id INTEGER,
        voter_id INTEGER,
        FOREIGN KEY(voter_id) REFERENCES voters(id),
        FOREIGN KEY(politician_id) REFERENCES politicians(id)
    )`)
})

db.close()