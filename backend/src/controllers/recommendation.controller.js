import { suggestNextTopic } from '../lib/recommendation.js';

export const getNextTopic = async (req, res) => {
    try {
        const userId = req.user.id;

        const topic = await suggestNextTopic(userId);

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'No recommendations available. You might have completed all topics!'
            });
        }

        res.status(200).json({
            success: true,
            data: topic
        });
    } catch (error) {
        console.error('Get recommendation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get recommendation.',
            error: error.message
        });
    }
};
