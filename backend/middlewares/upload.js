const multer = require('multer');
const path = require('path');

// Storage engine setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Photo is folder mein jayegi
    },
    filename: (req, file, cb) => {
        // Photo ka naam unique rakhne ke liye date use kar rahe hain
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload; // Ye line sab se zaroori hai!