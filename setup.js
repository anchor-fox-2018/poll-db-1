//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')
const command = process.argv[2]
const table = process.argv[3]
const column = process.argv[4]
const value = process.argv[5].split(',')
// console.log(value.map((value)=>'(?)').join(','))
// let sql = `INSERT INTO ${table}(${column}) VALUES ${value}`
// console.log(sql)
const limitedColumn = process.argv[6]
const limitation = process.argv[7]

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS politicians(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        party VARCHAR(1), 
        location VARCHAR(2),
        grade_current REAL )`,
    function(err){
        if(err){
            console.log(err)
        }
    })
    db.run(`CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR,
        last_name VARCHAR,
        gender VARCHAR,
        age INTEGER )`, 
    function(err){
        if(err){
            console.log(err)
        }
    })
    db.run(`CREATE TABLE IF NOT EXISTS votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        politician_id INTEGER,
        voter_id INTEGER,
        FOREIGN KEY(voter_id) REFERENCES voters(id),
        FOREIGN KEY(politician_id) REFERENCES politicians(id) )`,
    function(err){
        if(err){
            console.log(err)
        }
    })

    let placeholder = value.map((value)=>'(?)').join(',')
    if(command == 'insert'){
        db.run(`INSERT INTO ${table}(${column})
                VALUES (${placeholder}) `, value,
        function(err){
            if(err){
                console.log(err)
            }
        })
    } else if(command == 'edit'){
        db.run(`UPDATE ${table} 
                SET ${column} = ${value}
                WHERE ${limitedColumn} = ${limitation}`, 
                function(err){
                    if(err){
                        console.log(err)
                    }
                }
        )
    } else if(command == 'delete'){
        db.run(`DELETE FROM ${table} WHERE ${column} = ? `, limitation, 
        function(err){
            if(err){
                console.log(err)
            }
        })
    }
})

db.close()