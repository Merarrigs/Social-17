import express from 'express';
import dotenv from 'dotenv';
import monDb from './config/connection.js';
import routes from './routes/index.js';
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const startServer = async () => {
    try {
        await monDb(); // Ensure DB connects before starting the server
        app.use(routes);
        app.listen(PORT, () => {
            console.log(`✅ API server running on port ${PORT}!`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1); // Stop execution if DB connection fails
    }
};
startServer();
