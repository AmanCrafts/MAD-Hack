import { prisma } from '../config/db.js';

export const addBookmark = async (req, res) => {
    try {
        const userId = req.user.id;
        const { topicId } = req.body;

        if (!topicId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide topicId.'
            });
        }

        const bookmark = await prisma.bookmark.create({
            data: {
                userId,
                topicId
            }
        });

        res.status(201).json({
            success: true,
            message: 'Bookmark added successfully.',
            data: bookmark
        });
    } catch (error) {
        console.error('Add bookmark error:', error);
        // Handle unique constraint violation (already bookmarked)
        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: 'Topic already bookmarked.'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to add bookmark.',
            error: error.message
        });
    }
};

export const removeBookmark = async (req, res) => {
    try {
        const userId = req.user.id;
        const { topicId } = req.params;

        await prisma.bookmark.delete({
            where: {
                userId_topicId: {
                    userId,
                    topicId
                }
            }
        });

        res.status(200).json({
            success: true,
            message: 'Bookmark removed successfully.'
        });
    } catch (error) {
        console.error('Remove bookmark error:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Bookmark not found.'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to remove bookmark.',
            error: error.message
        });
    }
};

export const getBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookmarks = await prisma.bookmark.findMany({
            where: { userId },
            include: {
                topic: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            data: bookmarks
        });
    } catch (error) {
        console.error('Get bookmarks error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookmarks.',
            error: error.message
        });
    }
};
