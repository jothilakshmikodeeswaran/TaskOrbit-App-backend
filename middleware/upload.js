import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp");
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-"); // remove spaces
    cb(null, `${Date.now()}-${cleanName}`);
  },
});

const upload = multer({ storage });

export default upload;