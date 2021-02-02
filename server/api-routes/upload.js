import multer from "multer";
import imageThumbnail from "image-thumbnail";
import express from "express";
import fs from "fs";

const router = express.Router();

let filePath;
//set the destination folder
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    filePath = Date.now() + "-" + file.originalname;
    cb(null, filePath);
  },
});
//Create an upload instance and receive a single file
const upload = multer({ storage: storage }).array("file"); //single or array

router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    generateThumbnail();
    return res.status(200).json({ filePath });
  });
});

const generateThumbnail = async () => {
  let options = { percentage: 20 };
  try {
    const thumbnail = await imageThumbnail(
      `public/images/${filePath}`,
      options
    );

    fs.writeFile(`public/images/thumbnails/${filePath}`, thumbnail, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log("Thumbnail generated successfully!");
    });
  } catch (err) {
    console.error(err);
  }
};

export default router;
