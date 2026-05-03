const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Prevent multiple connections in serverless
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected successfully!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        throw err;
    }
};

module.exports = connectDB;