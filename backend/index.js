const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors'); 
const upload = require('./middlewares/upload'); 
const { registerStudent, getStudents, deleteStudent, updateStudent } = require('./controllers/studentController');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 

// Routes
app.post('/api/register', upload.single('image'), registerStudent);
app.get('/api/all', getStudents);
app.delete('/api/delete/:id', deleteStudent);
app.put('/api/update/:id', upload.single('image'), updateStudent);
// index.js ke aakhir mein ye ensure karein
const PORT = process.env.PORT || 5000;

// Ye sirf local development ke liye chale ga
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;