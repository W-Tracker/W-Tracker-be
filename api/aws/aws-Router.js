require("dotenv").config();
const router = require("express").Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const db = require("../../data/dbConfig");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("image");

router.post("/upload", upload, async (req, res) => {
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    try {
      const key = { ProfilePicture: data.key };
      await db("users").where("id", req.decodedToken.subject).update(key);
      const user = await db("users")
        .where("id", req.decodedToken.subject)
        .first();
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
});

router.get("/upload", async function (req, res, next) {
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME,
  });
  const user = await db("users").where("id", req.decodedToken.subject).first();
  s3bucket.createBucket(function () {
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${user.ProfilePicture}`,
    };
    s3bucket.getObject(params, function (err, data) {
      if (err) {
        console.log("Error: ", err);
      }
      console.log("Success: ", data);
      res.setHeader(
        "Content-disposition",
        `attachment; filename=${user.ProfilePicture}`
      );
      //   res.setHeader("Content-length", data.ContentLength);
      res.json(data);
    });
  });
});

module.exports = router;
