const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const dbConnect = async () => {

    const DB_URI =
        process.env.NODE_ENV === 'test'
            ? process.env.TEST_URI
            : process.env.PROD_URI;

    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.log('MongoDB connection error..');
    }
};

module.exports = dbConnect;
