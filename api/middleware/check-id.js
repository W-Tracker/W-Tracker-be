const db = require("../../data/dbConfig");

async function checkID(req, res, next) {
  try {
    const id = req.decodedToken.subject;
    let id2 = await db("strains").where({ id: req.params.id }).first();
    id2 = id2.user_id;
    if (id === id2) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "you can only effect your own creations" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = checkID;
