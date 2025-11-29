import { prisma } from '../config/db.js';

export const searchTopics = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a search query.'
            });
        }

        const topics = await prisma.topic.findMany({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                    { category: { name: { contains: q, mode: 'insensitive' } } }
                ]
            },
            include: {
                category: true
            }
        });

        res.status(200).json({
            success: true,
            count: topics.length,
            data: topics
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search topics.',
            error: error.message
        });
    }
};
