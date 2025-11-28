import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Prisma Connected to MongoDB');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
