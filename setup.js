const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs');

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

let politician_string = fs.readFileSync('./politicians.csv')
  .toString()
  .split("\n");
let voters_string = fs.readFileSync('./voters.csv')
  .toString()
  .split("\n");
let hasilVote_string = fs.readFileSync('./votes.csv')
  .toString()
  .split("\n");

db.serialize(function() {
  for (var i = 1; i < politician_string.length -1; i++) {
    let politicians = politician_string[i].split(',');
    db.run(`INSERT INTO pejabat (name, partai, location, grade_current)
      VALUES ('${politicians[0]}', '${politicians[1]}', '${politicians[2]}', '${politicians[3]}')`, function(err, row) {
        err ? console.log(err) : console.log('Berhasil');
      })
  }

  for (var j = 1; j < voters_string.length -1; j++) {
    let voters = voters_string[j].split(',');
    db.run(`INSERT INTO voters (first_name, last_name, gender, age)
      VALUES ('${voters[0]}', '${voters[1]}', '${voters[2]}', '${voters[3]}')`, function(err, row) {
        err ? console.log(err) : console.log('Berhasil');
      })
  }

  for (var k = 1; k < hasilVote_string.length -1; k++) {
    let hasilVote = hasilVote_string[k].split(',');
    db.run(`INSERT INTO hasilVote (pejabatID, votersID)
      VALUES ('${hasilVote[0]}', '${hasilVote[1]}')`, function(err, row) {
        err ? console.log(err) : console.log('Berhasil');
      })
  }

});
