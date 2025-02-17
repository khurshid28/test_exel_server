const express = require("express");
const multer = require("multer");
const path = require("path");


const PORT = process.env.PORT || 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix +ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".xlsx" && ext !== ".xls") {
      return cb(new Error("Only Excel files are allowed"));
    }
    cb(null, true);
  },
});

const app = express();

app.post("/upload-excel", upload.single("file"), function (req, res, next) {
    console.log("File successfully uploaded");

  res.send({
    message:"File successfully uploaded"
  })
});

app.listen(PORT, () => {
  console.log("App listen on 3000");
});
