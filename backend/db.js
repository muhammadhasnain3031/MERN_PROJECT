const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Mongoose khud connection handle karta hai
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully!");
    } catch (err) {
        console.log("Connection failed", err);
    }
}
module.exports = connectDB;