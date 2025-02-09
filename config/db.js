import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error in mongodb ${error}`.bgRed.white);
    }
}


export default connectDB;