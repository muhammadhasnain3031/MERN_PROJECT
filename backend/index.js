const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const upload = require('./middlewares/upload');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const {
    registerStudent,
    getStudents,
    deleteStudent,
    updateStudent
} = require('./controllers/studentController');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// IMPORTANT: connect DB safely once per request cycle
const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ message: "Database connection failed" });
    }
};

// Routes (DB safe wrapper use)
app.post('/api/register', dbMiddleware, upload.single('image'), registerStudent);
app.get('/api/all', dbMiddleware, getStudents);
app.delete('/api/delete/:id', dbMiddleware, deleteStudent);
app.put('/api/update/:id', dbMiddleware, upload.single('image'), updateStudent);

// PORT
const PORT = process.env.PORT || 5000;

// Only local server run (Vercel safe)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;