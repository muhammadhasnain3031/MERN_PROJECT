const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    course: String,
    image: String
});

module.exports = mongoose.model('Student', StudentSchema);