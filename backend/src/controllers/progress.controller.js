import { prisma } from '../config/db.js';

export const updateProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { topicId } = req.params;
        const { status, quizScore } = req.body;

        // Prepare update data
        const updateData = {
            lastAccessed: new Date()
        };

        if (status) updateData.status = status;
        if (quizScore !== undefined) updateData.quizScore = quizScore;
        if (status === 'COMPLETED') updateData.completedAt = new Date();

        const progress = await prisma.topicProgress.upsert({
            where: {
                userId_topicId: {
                    userId,
                    topicId
                }
            },
            update: updateData,
            create: {
                userId,
                topicId,
                status: status || 'IN_PROGRESS',
                quizScore: quizScore || 0,
                lastAccessed: new Date()
            }
        });

        res.status(200).json({
            success: true,
            message: 'Progress updated successfully.',
            data: progress
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update progress.',
            error: error.message
        });
    }
};

export const getProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { topicId } = req.params;

        const progress = await prisma.topicProgress.findUnique({
            where: {
                userId_topicId: {
                    userId,
                    topicId
                }
            }
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress not found.'
            });
        }

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch progress.',
            error: error.message
        });
    }
};

export const getAllProgress = async (req, res) => {
    try {
        const userId = req.user.id;

        const progress = await prisma.topicProgress.findMany({
            where: { userId },
            include: {
                topic: true
            }
        });

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (error) {
        console.error('Get all progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all progress.',
            error: error.message
        });
    }
};
