import mysql from "mysql2";

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'hellomysql'
});

conn.connect((err) => {
    if (err) {
        throw err
    };
    console.log("MySQL is connected.");
});


export default conn;
