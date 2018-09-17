
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')
const fs = require('fs')

let politicians = fs.readFileSync('politicians.csv').toString().split('\n')
let voters = fs.readFileSync('voters.csv').toString().split('\n')
let votes = fs.readFileSync('votes.csv').toString().split('\n')

for(let i = 0; i < politicians.length; i++){
    let politician = politicians[i].split(',')
    // console.log(politician)
    db.run(`INSERT INTO politicians(name, party, location, grade_current) 
            VALUES ('${politician[0]}', '${politician[1]}', '${politician[2]}', '${politician[3]}' )
    `)
}

for(let j = 0; j < voters.length; j++){
    let voter = voters[j].split(',')
    db.run(`INSERT INTO voters(first_name, last_name, gender, age) 
            VALUES ("${voter[0]}", "${voter[1]}", "${voter[2]}", "${voter[3]}")
    `)
}

for(let k = 0; k < votes.length; k++){
    let vote = votes[k].split(',')
    db.run(`INSERT INTO votes(voter_id, politician_id) 
            VALUES ('${vote[0]}', '${vote[1]}') 
    `) 
}

