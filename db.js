var mysql = require("mysql");

var connPool = mysql.createPool({
    connectionLimit: 5,
    host: "127.0.0.1",
    user: "C4131F22U84",
    database: "C4131F22U84",
    password: "fds-98jkl!"
});

function updateContactMe(title, email, user, link, cat, msg) {
    return new Promise((resolve, reject)=>{
        const sql = "insert into contact_me (title, email, username, link, message_category, note) values (?, ?, ?, ?, ?, ?)";
        connPool.query(sql, [title, email, user, link, cat, msg], (error, rows)=>{
            if (error) 
            {
                reject(error);
                return false;
            } 
            else 
            {
                resolve(rows);
                return true;
            }
        })
    })
}
exports.updateContactMe=updateContactMe;

function getMessages(filter)
{
    return new Promise((resolve, reject)=>{
        let sql = "";
        console.log("Filter: ", filter);      
        if (filter == null || filter == "all")
        {
          sql = "select title, email, username, link, message_category, note from contact_me";
          console.log(sql);
        }
        else
        {
          sql = `select title, email, username, link, message_category, note from contact_me where message_category = '${filter}'`; 
          console.log(sql);
        }
        connPool.query(sql, (err, rows)=>{
            if (err) 
            {
                reject(err);
            } 
            else 
            {
                resolve(rows);
            }
        })
    })
}
exports.getMessages=getMessages;