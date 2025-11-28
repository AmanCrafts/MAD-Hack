import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL || process.env.MONGO_URI || 'mongodb://localhost:27017/skillbites'
}