var sql = require('sqlite3').verbose()
var db = new sql.Database('./database/blogs.db')
db.run('CREATE TABLE IF NOT EXISTS Blogs(author_name text,topic text,topic_id text,content text)');
const create = (data) => {
    const { author, Topic, Topic_id, content } = data
    var x = 0;
    // console.log(typeof(author),typeof(Topic),typeof(Topic_id),typeof(content))
    db.serialize(() => {
        db.run('INSERT INTO Blogs(AUTHOR_NAME,TOPIC,TOPIC_ID,CONTENT) VALUES(?,?,?,?)', [author, Topic, Topic_id, content], (err) => {
            if (err) {
                x = err.message
                console.log(err.message)
            }
            x = "success"
            console.log("Success")

        })
    })
    return x
}

const read = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Blogs', (err, row) => {
            if (err) {
                reject(err.message)
            }
            resolve(row)
        })
    })
}
const update=(data)=>new Promise((resolve,rject)=>{
    db.run('UPDATE Blogs SET content=? WHERE Topic_id=?',[data.content,data.topic_id],(err)=>{
        if(err){
            reject(err.message)
        }
        else{
            resolve("Success")
        }
    })
})

const readbyid=(data)=>new Promise((resolve,reject)=>{
    db.each("SELECT * FROM Blogs WHERE topic_id=?",data, function (err, row) {
        if (err) {
            console.log(err.message)
            reject(err.message)
        }
        console.log(row)
        resolve([row])
    })
})

const delet=(data)=>{
    return new Promise((resolve,reject)=>{
        db.run('DELETE FROM Blogs WHERE Topic_id=?',data,(err)=>{
            if(err){
                reject(err.message)
            }
            else{
                resolve("Successfully delted")
            }
        })
    })
}
module.exports = {
    create, read, update, delet, readbyid
}