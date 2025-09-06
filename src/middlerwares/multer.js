import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // folder where files are stored temporarily
  },
  filename: (req, file, cb) => {

    cb(null, file.fieldname + "-" + uniqueName);
  },
});



export const upload = multer({
    storage,
});
