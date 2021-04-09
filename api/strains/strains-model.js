const db = require("../../data/dbConfig")

async function getByUserId(id){
    return db("strains").where({"user_id": id})
}

async function addStrain(data){
    const [id] = await db("strains").insert(data)
    return db("strains").where({id}).first()
}

async function updateStrain(id, data){
    const x = await db("strains").update(data).where({id})
    return db("strains").where({id}).first()
}

async function deleteStrain(id){
    return db("strains").where({id}).delete()
}

module.exports = {
    getByUserId,
    addStrain,
    updateStrain,
    deleteStrain
}