import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL || process.env.MONGO_URI || 'mongodb://localhost:27017/skillbites',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: process.env.JWT_SECRET
}