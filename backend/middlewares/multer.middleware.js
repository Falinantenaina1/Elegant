import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error("File type not allowed"), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});
