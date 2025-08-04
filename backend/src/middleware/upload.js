const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create an absolute path to the posters directory for reliability
const postersDir = path.join(__dirname, '../../uploads/posters');

// Ensure the directory exists
if (!fs.existsSync(postersDir)){
    fs.mkdirSync(postersDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, postersDir);
  },
  filename: function (req, file, cb) {
    // Using a more unique filename format
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `poster-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: Images Only!'));
  }
});

module.exports = upload;