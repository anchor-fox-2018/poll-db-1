// sqlite3, db file, and fs
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
    if(err) {
        console.log(err.message);
    }
    else {
        console.log(`*clink* *clink* come out to play!`);
    }
});
const fs = require('fs');

// CSV TO ARRAY
let politiciansEd = fs.readFileSync('./politicians.csv').toString().split('\n');
let votersEd = fs.readFileSync('./voters.csv').toString().split('\n');
let votesEd = fs.readFileSync('./votes.csv').toString().split('\n');


// DB SERIALIZE: MAKE EACH FILES
db.serialize(function() {

    // politicians
    db.run(`CREATE TABLE IF NOT EXISTS politicians(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current TEXT
    )`)

    // voters 
    db.run(`CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`)

    // votes
    db.run(`CREATE TABLE IF NOT EXISTS votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,

        FOREIGN KEY (voterId) REFERENCES voters(id),
        FOREIGN KEY (politicianId) REFERENCES politicians(id)
    )`)
});

// close
db.close();