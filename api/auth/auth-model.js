const db = require("../../data/dbConfig")

function findBy(filter) {
    return db("users")
      .select("id", "username", "password")
      .where(filter);
}

function findById(id){
    return db("users").where({id}).first()
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
}

async function getAll(){
    return db('users').select("id" ,"username")
}

module.exports = {
    findBy,
    add,
    getAll
}