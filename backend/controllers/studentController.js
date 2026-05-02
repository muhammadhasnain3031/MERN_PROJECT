const Student = require('../models/student');

// 1. Student Register karne ka function (With Image)
exports.registerStudent = async (req, res) => {
    try {
        console.log("Body Data:", req.body);
        console.log("File Data:", req.file);

        const { name, email, course } = req.body;
        
        // Image ka naam multer se aa raha hai
        const imagePath = req.file ? req.file.filename : "";

        // Backend validation
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name aur Email zaroori hain!" });
        }

        const nayaStudent = new Student({
            name,
            email,
            course,
            image: imagePath
        });

        await nayaStudent.save();
        
        // Response lazmi bhejna hai taake React ko pata chale kaam ho gaya
        res.status(201).json({ 
            success: true, 
            message: "Student Registered Successfully!", 
            data: nayaStudent 
        });

    } catch (err) {
        console.error("Save Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// 2. Saare Students dikhane ka function
exports.getStudents = async (req, res) => {
    try {
        const allStudents = await Student.find();
        res.status(200).json(allStudents);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 3. Student Delete karne ka function
exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await Student.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "Student nahi mila!" });
        }

        res.status(200).json({ success: true, message: "Student delete ho gaya!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 4. Student Update karne ka function
// 4. Student Update karne ka function (Fixed Version)
exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        
        // 1. Text data nikaalain
        const { name, email, course } = req.body;
        let updateData = { name, email, course };

        // 2. 🔥 Sabse Zaroori: Check karein ke kya multer ne nayi file di hai?
        if (req.file) {
            updateData.image = req.file.filename; // Naya filename database ke liye
            console.log("Backend: Nayi image detect hui ->", req.file.filename);
        }

        // 3. Database update karein
        const updated = await Student.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { new: true }
        );
        
        if (!updated) {
            return res.status(404).json({ success: false, message: "Student nahi mila!" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Update ho gaya", 
            data: updated 
        });
    } catch (err) {
        console.error("Update Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};