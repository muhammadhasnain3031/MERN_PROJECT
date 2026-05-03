const Student = require('../models/Student');


// ========================
// CREATE STUDENT (REGISTER)
// ========================
const registerStudent = async (req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = "";

        // Cloudinary image (multer gives req.file.path)
        if (req.file) {
            imageUrl = req.file.path;
        }

        const newStudent = await Student.create({
            name,
            email,
            course,
            image: imageUrl
        });

        res.status(201).json({
            success: true,
            data: newStudent
        });

    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Server Error during registration" });
    }
};


// ========================
// GET ALL STUDENTS
// ========================
const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.status(200).json(students);

    } catch (error) {
        console.error("Fetch Error:", error.message);
        res.status(500).json({ message: "Failed to fetch students" });
    }
};


// ========================
// DELETE STUDENT
// ========================
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Student.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });

    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ message: "Delete operation failed" });
    }
};


// ========================
// UPDATE STUDENT
// ========================
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, course } = req.body;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        let imageUrl = student.image;

        // If new image uploaded
        if (req.file) {
            imageUrl = req.file.path;
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                name,
                email,
                course,
                image: imageUrl
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedStudent
        });

    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ message: "Update failed" });
    }
};


// ========================
// EXPORT
// ========================
module.exports = {
    registerStudent,
    getStudents,
    deleteStudent,
    updateStudent
};