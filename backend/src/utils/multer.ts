import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import config from "../config/config";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads')
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage });

export default upload;
