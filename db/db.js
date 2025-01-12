const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected successfully');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
};
