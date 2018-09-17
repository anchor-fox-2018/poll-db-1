const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const command = process.argv[2];

if (command === 'addPejabat') {
  db.run(`INSERT INTO pejabat (name, partai, location, grade_current)
          VALUES ('${process.argv[3]}', '${process.argv[4]}', '${process.argv[5]}', '${process.argv[6]}')`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'updatePejabat') {
  db.run(`UPDATE pejabat SET name = '${process.argv[4]}', partai = '${process.argv[5]}',
          location = '${process.argv[6]}', grade_current = '${process.argv[7]}'
          WHERE id = '${process.argv[3]}'`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'deletePejabat') {
  db.run(`DELETE FROM pejabat
          WHERE id = '${process.argv[3]}'`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'addVoter') {
  db.run(`INSERT INTO voters (first_name, last_name, gender, age)
          VALUES ('${process.argv[3]}', '${process.argv[4]}', '${process.argv[5]}', '${process.argv[6]}')`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'updateVoter') {
  db.run(`UPDATE voters SET first_name = '${process.argv[4]}',
          last_name = '${process.argv[5]}',
          gender = '${process.argv[6]}', age = '${process.argv[7]}'
          WHERE id = '${process.argv[3]}'`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'deleteVoter') {
  db.run(`DELETE FROM voters
          WHERE id = '${process.argv[3]}'`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'addHasilVote') {
  db.run(`INSERT INTO hasilVote (pejabatID, votersID)
          VALUES ('${process.argv[3]}', '${process.argv[4]}')`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'updateHasilVote') {
  db.run(`UPDATE hasilVote SET pejabatID = '${process.argv[4]}',
          votersID = '${process.argv[5]}'
          WHERE id = '${process.argv[3]}'`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
} else if (command === 'deleteHasilVote') {
  db.run(`DELETE FROM hasilVote
          WHERE id = '${process.argv[3]}'`, function(err) {
          err ? console.log(err) : console.log('Berhasil');
          })
}
