const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const upload = require('./middlewares/upload');

// Config
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "https://mern-project-seven-delta.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection Middleware (Vercel ke liye best hai)
const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};

const {
    registerStudent,
    getStudents,
    deleteStudent,
    updateStudent
} = require('./controllers/studentController');

// Routes
app.post('/api/register', dbMiddleware, upload.single('image'), registerStudent);
app.get('/api/all', dbMiddleware, getStudents);
app.delete('/api/delete/:id', dbMiddleware, deleteStudent);
app.put('/api/update/:id', dbMiddleware, upload.single('image'), updateStudent);

// Test Route
app.get('/', (req, res) => res.send("Hospital Management API is live!"));

// PORT setup
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;