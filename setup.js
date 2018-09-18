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
console.log(politiciansEd);

let votersEd = fs.readFileSync('./voters.csv').toString().split('\n');
console.log(votersEd);

let votesEd = fs.readFileSync('./votes.csv').toString().split('\n');
console.log(votesEd);


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

// DB SERIALIZE: PUSH EACH FILE TO TABLE
db.serialize(function() {
    
    // politicians
    for (let i = 1; i < politiciansEd.length - 1; i++) {

        //testing
        // console.log(`${politiciansEd[i][0]} ${politiciansEd[i][1]} ${politiciansEd[i][2]} ${politiciansEd[i][3]}`);

        let tempPolitician = politiciansEd[i].split(',');

        db.run(`INSERT INTO politicians (name, party, location, grade_current)
                VALUES ('${tempPolitician[0]}', '${tempPolitician[1]}', '${tempPolitician[2]}', '${tempPolitician[3]}')`, function (err) {
                    if (err) {
                        console.log(err.message);
                    }

                    else {
                        console.log('adding politicians: working');
                    }
                }
            )
    };

    // voters
    for (let i = 1; i < votersEd.length - 1; i++) {

        //testing
        // console.log(`${votersEd[i][0]} ${votersEd[i][1]} ${votersEd[i][2]} ${votersEd[i][3]}`);

        let tempVoters = votersEd[i].split(',');
        
        db.run(`INSERT INTO voters (first_name, last_name, gender, age)
                VALUES ('${tempVoters[0]}', '${tempVoters[1]}', '${tempVoters[2]}', '${tempVoters[3]}')`, function (err) {
                    if (err) {
                        console.log(err.message);
                    }

                    else {
                        console.log('adding voters: working');
                    }
                }
            )
    };

    // votes
    for (let i = 1; i < votesEd.length - 1; i++) {

        let tempVotes = votesEd[i].split(',');

        db.run(`INSERT INTO votes (voterId, politicianId)
                VALUES ('${tempVotes[0]}', '${tempVotes[0]}')`, function (err) {
                    if (err) {
                        console.log(err.message);
                    }

                    else {
                        console.log('add votes: working');
                    }
                }
            )

    };

});

// close
db.close();