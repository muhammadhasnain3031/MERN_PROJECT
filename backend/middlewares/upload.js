const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Cloudinary storage setup - Ye direct Cloudinary par bhejta hai
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mern-students', 
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;