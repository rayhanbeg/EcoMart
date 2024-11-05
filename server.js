import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

// config dotenv
dotenv.config();


// database connection
connectDB();


// rest object
const app = express();


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


// routes
app.use('/api/v1/auth', authRoutes);

// rest api
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// PORT
const PORT = process.env.PORT || 5000;

// run listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
})