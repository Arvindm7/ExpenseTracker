const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected Successfully');

        // Connection event listeners for monitoring
        mongoose.connection.on('error', (err) => {
            console.error(' MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(' MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        // Exit process on initial connection failure — let the hosting platform restart
        process.exit(1);
    }
};

module.exports = { db };
