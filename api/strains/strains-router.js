const router = require("express").Router();
const checkID = require("../middleware/check-id");
const SM = require("./strains-model");

router.get("/", async (req, res) => {
  try {
    const id = req.decodedToken.subject;
    const data = await SM.getByUserId(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = {
      user_id: req.decodedToken.subject,
      name: req.body.name,
      hits: req.body.hits,
      feel: req.body.feel,
      strain: req.body.strain,
      type: req.body.type,
      concentrate: req.body.concentrate,
      favorites: req.body.favorites,
      percentage: req.body.percentage,
      other: req.body.other,
    };
    const data = await SM.addStrain(body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:id", checkID, async (req, res) => {
  try {
    const data = await SM.updateStrain(req.params.id, req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", checkID, async (req, res) => {
  try {
    await SM.deleteStrain(req.params.id);
    res.status(200).json("Its gone now");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
